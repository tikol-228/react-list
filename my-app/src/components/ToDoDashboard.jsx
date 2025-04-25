import React, { useCallback, useReducer, useState, useRef, useEffect } from 'react';
import Button from './Button';
import AddToDoModal from './ManageToDoModal';
import Card from './Card';
import styles from './ToDoDashboard.module.css';
import BaseField from './BaseField';
import Input from './Input';
import { ACTIONS, todoReducer } from '../helpers/todoReducer';
import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemProvider';
import { useToast } from '../providers/ToastProvider';

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

    const handleEditSubmit = (newTitle, newDescription) => {
        dispatch({
            type: ACTIONS.edit,
            payload: {
                id: editIndex,
                title: newTitle,
                description: newDescription,
            },
        });

        setIsAddToDoModalOpen(false);
        setEditIndex(null);
        setEditTitle('');
        setEditDescription('');
    };

    const handleSubmit = (title, description) => {
        dispatch({ type: ACTIONS.add, payload: { title, description, id: Date.now(), status: "To Do" } });
        setIsAddToDoModalOpen(false);
    };

    const clearDeletedTodos = () => {
        dispatch({ type: ACTIONS.clear });
        addToast('Deleted tasks cleared', 'success'); // Показываем уведомление
    };

    const stats = (todos || []).reduce((acc, todo) => {
        acc[todo.status] = (acc[todo.status] || 0) + 1;
        return acc;
    }, { "To Do": 0, "In Progress": 0, "Done": 0, "Deleted": 0 });

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
                        onDrop={() => dispatch({ type: ACTIONS.drop, payload: status })}
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
                                >
                                    <Card
                                        id={todo.id}
                                        title={todo.title}
                                        description={todo.description}
                                        colRefs={colomnRefs} // Передаем рефы колонок
                                        taskStatus={todo.status}
                                        onEdit={handleEdit}
                                        dispatch={dispatch}
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