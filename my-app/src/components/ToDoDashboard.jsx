import React, { useReducer, useState } from 'react';
import Button from './Button';
import AddToDoModal from './ManageToDoModal';
import Card from './Card';
import styles from './ToDoDashboard.module.css';
import BaseField from './BaseField';
import Input from './Input';
import { ACTIONS, todoReducer } from '../helpers/todoReducer';
import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemProvider';

const ToDoDashboard = () => {
    const [isAddToDoModalOpen, setIsAddToDoModalOpen] = useState(false);
    const initialState = {
        todos: [],  // Начальное состояние todos — это пустой массив.
        draggingId: null,
    };    
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { todos, draggingId } = state;
    const [editIndex, setEditIndex] = useState(null); // Индекс редактируемой задачи
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [search, setSearch] = useState('');
    const {theme, toggleTheme} = useContext(ThemeContext);

    const handleAddBtnClick = () => {
        setIsAddToDoModalOpen(!isAddToDoModalOpen);
    };

    const clearDeletedTodos = () => {
        dispatch({ type: ACTIONS.clear });
    };

    const handleEdit = (index) => {
        const todoToEdit = todos[index];
        setEditIndex(todoToEdit.id); // передаем id вместо индекса
        setEditTitle(todoToEdit.title);
        setEditDescription(todoToEdit.description);
        setIsAddToDoModalOpen(true);
    }

    const handleEditSubmit = (newTitle, newDescription) => {
        dispatch({
            type: ACTIONS.edit,
            payload: {
              index: editIndex,
              title: newTitle,
              description: newDescription
            }
        });
      
        // Очистка и закрытие модалки
        setIsAddToDoModalOpen(false);
        setEditIndex(null);
        setEditTitle('');
        setEditDescription('');
    };   

    const handleSubmit = (title,description) => {
        console.log(title)
        console.log(description)
        dispatch({type: ACTIONS.add, payload: {title,description,id: Date.now(),status: "To Do",}})
        setIsAddToDoModalOpen(false)
    }
    const stats = (todos || []).reduce((acc, todo) => {
        acc[todo.status] = (acc[todo.status] || 0) + 1;
        return acc;
    }, { "To Do": 0, "In Progress": 0, "Done": 0, "Deleted": 0 });
    

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
                    <Input className={styles.searchInput} value={search} onChange={(e) => setSearch(e.target.value)}/>
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
                    onSumbmit={handleSubmit}
                />
            )}

            <div className={styles.columns}>
                {statuses.map((status) => (
                    <div key={status} className={styles.column}
                    onDragOver={(e) => e.preventDefault()} // нужно для разрешения drop
                    onDrop={() => dispatch({ type: ACTIONS.drop, payload: status })}>
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
                            .map((todo, index) => (
                                <Card
                                    key={todo.id}
                                    id={todo.id}
                                    title={todo.title}
                                    description={todo.description}
                                    status={todo.status}
                                    index={index}
                                    onEdit={handleEdit}
                                    dispatch={dispatch}
                                />
                            ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ToDoDashboard;