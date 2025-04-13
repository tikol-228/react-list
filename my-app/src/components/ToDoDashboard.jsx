import React, { useReducer, useState } from 'react';
import Button from './Button';
import AddToDoModal from './ManageToDoModal';
import Card from './Card';
import styles from './ToDoDashboard.module.css';
import { ACTIONS, todoReducer } from '../helpers/todoReducer';
import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemProvider';

const ToDoDashboard = () => {
    const [isAddToDoModalOpen, setIsAddToDoModalOpen] = useState(false);
    const [todos, dispatch] = useReducer(todoReducer,[]);
    const [editIndex, setEditIndex] = useState(null); // Индекс редактируемой задачи
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const {theme, toggleTheme} = useContext(ThemeContext);

    const handleAddBtnClick = () => {
        setIsAddToDoModalOpen(!isAddToDoModalOpen);
    };

    const clearDeletedTodos = () => {
        dispatch({ type: ACTIONS.clear });
    };

    const handleEdit = (index) => {
        const todoToEdit = todos[index];
        console.log(todoToEdit)
        console.log(index)
        dispatch({type: ACTIONS.edit, payload: {index, title: todoToEdit.title, description: todoToEdit.description}});
        setIsAddToDoModalOpen(true); // Открываем модалку для редактирования
    };

    const handleEditSubmit = (newTitle, newDescription) => {
        setTodos(prevTodos => 
            prevTodos.map((todo, i) => 
                i === editIndex ? { ...todo, title: newTitle, description: newDescription } : todo
            )
        );
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
    const stats = todos.reduce((acc, todo) => {
        acc[todo.status] = (acc[todo.status] || 0) + 1;
        return acc;
    }, { "To Do": 0, "In Progress": 0, "Done": 0, "Deleted": 0 });

    const statuses = ["To Do", "In Progress", "Done", "Deleted"];

    
    
    return (
        <>
            <div className={styles.container}>
                <Button className={styles.addBtn} onClick={handleAddBtnClick}>
                    Add
                </Button>
                <Button className={styles.themeBtn} onClick={toggleTheme}>
                    change theme: {theme}
                </Button>
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
                    <div key={status} className={styles.column}>
                        <h2 className={styles.columnHeader}>
                            {status}
                            {status === 'Deleted' && (
                                <Button className={styles.clearBtn} onClick={clearDeletedTodos}>
                                    Clear all
                                </Button>
                            )}
                        </h2>
                        {todos
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