import React, { useState } from 'react';
import Button from './Button';
import AddToDoModal from './AddToDoModal';
import Card from './Card';
import styles from './ToDoDashboard.module.css';

const ToDoDashboard = () => {
    const [isAddToDoModalOpen, setIsAddToDoModalOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Индекс редактируемой задачи
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleAddBtnClick = () => {
        setIsAddToDoModalOpen(!isAddToDoModalOpen);
    };

    const clearDeletedTodos = () => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.status !== "Deleted"));
    };

    const handleEdit = (index) => {
        const todoToEdit = todos[index];
        setEditIndex(index);
        setEditTitle(todoToEdit.title);
        setEditDescription(todoToEdit.description);
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
    
    return (
        <>
            <div className='container'>
                <Button className='addBtn' onClick={handleAddBtnClick}>Add</Button>
            </div>
            {isAddToDoModalOpen && (
                <AddToDoModal 
                    onClose={() => setIsAddToDoModalOpen(false)} 
                    setTodos={setTodos}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editDescription={editDescription}
                    setEditDescription={setEditDescription}
                    onEditSubmit={handleEditSubmit} // Передаем функцию для редактирования
                />
            )}

            <div className={styles.columns}>
                <div className={styles.column}>
                    <h2>To Do</h2>
                    {todos.filter(todo => todo.status === "To Do").map((todo, index) => (
                        <Card 
                            key={index} 
                            title={todo.title} 
                            description={todo.description} 
                            status={todo.status} 
                            setTodos={setTodos} 
                            index={index} 
                            onEdit={handleEdit} // Передаем функцию редактирования
                        />
                    ))}
                </div>
                <div className={styles.column}>
                    <h2>In Progress</h2>
                    {todos.filter(todo => todo.status === "In Progress").map((todo, index) => (
                        <Card 
                            key={index} 
                            title={todo.title} 
                            description={todo.description} 
                            status={todo.status} 
                            setTodos={setTodos} 
                            index={index} 
                            onEdit={handleEdit} // Передаем функцию редактирования
                        />
                    ))}
                </div>
                <div className={styles.column}>
                    <h2>Done</h2>
                    {todos.filter(todo => todo.status === "Done").map((todo, index) => (
                        <Card 
                            key={index} 
                            title={todo.title} 
                            description={todo.description} 
                            status={todo.status} 
                            setTodos={setTodos} 
                            index={index} 
                            onEdit={handleEdit} // Передаем функцию редактирования
                        />
                    ))}
                </div>
                <div className={styles.column}>
                    <h2>Deleted 
                        <Button className={styles.clearBtn} onClick={clearDeletedTodos}>Clear all</Button>
                    </h2>
                    {todos.filter(todo => todo.status === "Deleted").map((todo, index) => (
                        <Card 
                            key={index} 
                            title={todo.title} 
                            description={todo.description} 
                            status={todo.status} 
                            setTodos={setTodos} 
                            index={index} 
                            onEdit={handleEdit} // Передаем функцию редактирования
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ToDoDashboard;