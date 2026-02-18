import React, { useCallback, useReducer, useState, useRef, useEffect } from 'react';
import Button from './Button';
import AddToDoModal from './ManageToDoModal';
import Card from './Card';
import styles from './ToDoDashboard.module.css';
import BaseField from './BaseField';
import Input from './Input';
import { ACTIONS, todoReducer, getNextStatus, getBackStatus } from '../helpers/todoReducer';
import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemProvider';
import { useToast } from '../providers/ToastProvider';
import { fetchNotes, createNote, updateNote, deleteNote, saveNotes } from '../api/notes';

const ToDoDashboard = () => {
    const [isAddToDoModalOpen, setIsAddToDoModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Новое состояние для отслеживания режима редактирования
    const initialState = {
        todos: [],
        draggingId: null,
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { todos } = state;
    const [editIndex, setEditIndex] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [search, setSearch] = useState('');
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { addToast } = useToast();
    const refs = useRef({}); // Создаем объект для хранения ссылок на карточки
    const colomnRefs = useRef({}); // Создаем объект для хранения ссылок на колонки

    const handleAddBtnClick = useCallback(() => {
        setIsEditing(false); // Устанавливаем режим добавления
        setIsAddToDoModalOpen(true);
    }, []);

    const handleEdit = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id);

        if (!todoToEdit) {
            console.error(`Task with id ${id} not found`);
            return;
        }

        setIsEditing(true); // Устанавливаем режим редактирования
        setEditIndex(id);
        setEditTitle(todoToEdit.title);
        setEditDescription(todoToEdit.description);
        setIsAddToDoModalOpen(true);
    };

    // Подсветка колонки "To Do" только при добавлении новой задачи
    useEffect(() => {
        const toDoColumn = colomnRefs.current['To Do'];
        if (!isEditing && isAddToDoModalOpen && toDoColumn) {
            toDoColumn.classList.add(styles.highlightCard); // Добавляем подсветку
        } else if (toDoColumn) {
            toDoColumn.classList.remove(styles.highlightCard); // Убираем подсветку
        }
    }, [isAddToDoModalOpen, isEditing]);
    
    // Load notes from backend on mount
    useEffect(() => {
    fetchNotes()
        .then(data => {
            console.log(data);
            dispatch({ type: ACTIONS.set, payload: data });
        })
        .catch(err => {
            addToast('Failed to load tasks', 'error');
            console.error(err);
        });
    }, []);


    const handleEditSubmit = async (newTitle, newDescription) => {
        try {
            const updated = await updateNote(editIndex, { title: newTitle, description: newDescription });
            dispatch({
                type: ACTIONS.edit,
                payload: {
                    id: editIndex,
                    title: updated.title,
                    description: updated.description,
                },
            });
            addToast('Task updated', 'success');
        } catch (err) {
            addToast('Update failed', 'error');
            console.error(err);
        }

        setIsAddToDoModalOpen(false);
        setEditIndex(null);
        setEditTitle('');
        setEditDescription('');
    };

    const handleSubmit = async (title, description) => {
        try {
            const created = await createNote({ title, description, status: "To Do" });
            dispatch({ type: ACTIONS.add, payload: created });
            addToast('Task created', 'success');
        } catch (err) {
            addToast('Create failed', 'error');
            console.error(err);
        }
        setIsAddToDoModalOpen(false);
    };

    const clearDeletedTodos = async () => {
        const deleted = todos.filter(t => t.status === 'Deleted');
        try {
            await Promise.all(deleted.map(t => deleteNote(t.id)));
            dispatch({ type: ACTIONS.clear });
            addToast('Deleted tasks cleared', 'success');
        } catch (err) {
            addToast('Failed to clear deleted tasks', 'error');
            console.error(err);
        }
    };

    const stats = (todos || []).reduce((acc, todo) => {
        acc[todo.status] = (acc[todo.status] || 0) + 1;
        return acc;
    }, { "To Do": 0, "In Progress": 0, "Done": 0, "Deleted": 0 });

    // Handlers that sync changes with the backend
    const handleMoveNext = async (id) => {
       
        if (!todo) return;
        const newStatus = getNextStatus(todo.status);
        try {
            await updateNote(id, { ...todo, status: newStatus });
            dispatch({ type: ACTIONS.moveNext, payload: id });
        } catch (err) {
            addToast('Move failed', 'error'); console.error(err);
        }
    };

    const handleBack = async (id) => {
       
        const newStatus = getBackStatus(todo.status);
        try {
            await updateNote(id, { ...todo, status: newStatus });
            dispatch({ type: ACTIONS.back, payload: id });
        } catch (err) {
            addToast('Move failed', 'error'); console.error(err);
        }
    };

    const handleDelete = async (id) => {
       
        console.log(todo)
        if (!todo) return;
        try {
            await updateNote(id, { ...todo, status: 'Deleted' });
            dispatch({ type: ACTIONS.delete, payload: id });
        } catch (err) {
            addToast('Delete failed', 'error'); console.error(err);
        }
    };

    const handleDrop = async (status) => {
        const id = state.draggingId;
        if (!id) return;
       
        if (!todo) return;
        try {
            await updateNote(id, { ...todo, status });
            dispatch({ type: ACTIONS.drop, payload: status });
        } catch (err) {
            addToast('Drop failed', 'error'); console.error(err);
        }
    };

    const handleReorder = async (fromId, toId) => {
        if (!fromId || !toId) return;
        if (fromId === toId) return;
        const todosCopy = [...todos];
        const fromIndex = todosCopy.findIndex(t => t.id === fromId);
        const toIndex = todosCopy.findIndex(t => t.id === toId);
        if (fromIndex === -1 || toIndex === -1) return;
        if (todosCopy[fromIndex].status !== todosCopy[toIndex].status) return;
        const [moved] = todosCopy.splice(fromIndex, 1);
        todosCopy.splice(toIndex, 0, moved);
        try {
            await saveNotes(todosCopy);
            dispatch({ type: ACTIONS.reorder, payload: { fromId, toId } });
            addToast('Order saved', 'success');
        } catch (err) {
            addToast('Save order failed', 'error'); console.error(err);
        }
    }; 

    const handleSearchChange = useCallback((e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);

        // Убираем обводку со всех карточек
        Object.values(refs.current).forEach((ref) => {
            if (ref) ref.classList.remove(styles.highlight);
        });

        // Если поле поиска не пустое, добавляем обводку найденным карточкам
        if (searchValue) {
            todos.forEach((todo) => {
                if (
                    todo.title.toLowerCase().includes(searchValue) ||
                    todo.description.toLowerCase().includes(searchValue)
                ) {
                    const ref = refs.current[todo.id];
                    if (ref) ref.classList.add(styles.highlight);
                }
            });
        }
    }, [todos]);

    const statuses = ["To Do", "In Progress", "Done", "Deleted"];

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase()) ||
        todo.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className={styles.container}>
                <Button className={styles.addBtn} onClick={handleAddBtnClick}>
                    Add
                </Button>
                <Button className={styles.themeBtn} onClick={toggleTheme}>
                    change theme: {theme}
                </Button>
                <BaseField className={styles.field} label="search: ">
                    <Input
                        className={styles.searchInput}
                        value={search}
                        onChange={handleSearchChange}
                    />
                </BaseField>     

                <div className={styles.statsBox}>
                    <h2>stats</h2>
                    <ul>
                        <li>Total To Do: {todos.length}</li>
                        <li>To Do: {stats['To Do']}</li>
                        <li>In Progress: {stats['In Progress']}</li>
                        <li>Done: {stats['Done']}</li>
                        <li>Deleted: {stats['Deleted']}</li>
                    </ul>
                </div>
            </div>

            {isAddToDoModalOpen && (
                <AddToDoModal
                    onClose={() => setIsAddToDoModalOpen(false)}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editDescription={editDescription}
                    setEditDescription={setEditDescription}
                    onEditSubmit={handleEditSubmit}
                    onSubmit={handleSubmit}
                />
            )}

            <div className={styles.columns}>
                {statuses.map((status) => (
                    <div
                        key={status}
                        ref={(el) => (colomnRefs.current[status] = el)} // Привязываем реф к колонке
                        className={styles.column}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(status)}
                    >
                        <h2 className={styles.columnHeader}>
                            {status}
                            {status === 'Deleted' && (
                                <Button className={styles.clearBtn} onClick={clearDeletedTodos}>
                                    Clear all
                                </Button>
                            )}
                        </h2>
                        {filteredTodos
                            .filter((todo) => todo.status === status)
                            .map((todo) => (
                                <div
                                    key={todo.id}
                                    ref={(el) => (refs.current[todo.id] = el)}
                                    className={styles.card}
                                    draggable
                                    onDragStart={(e) => { e.dataTransfer?.setData('text/plain', todo.id); dispatch({ type: ACTIONS.dragStart, payload: todo.id }); }}
                                    onDragEnd={() => dispatch({ type: ACTIONS.dragStart, payload: null })}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => { e.preventDefault(); handleReorder(state.draggingId, todo.id); }}
                                >
                                    <Card
                                        id={todo.id}
                                        title={todo.title}
                                        description={todo.description}
                                        colRefs={colomnRefs} // Передаем рефы колонок
                                        taskStatus={todo.status}
                                        onEdit={handleEdit}
                                        onMoveNext={handleMoveNext}
                                        onDelete={handleDelete}
                                        onBack={handleBack}
                                    />
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ToDoDashboard;