import React from 'react'
import Button from './Button'
import AddToDoModal from './AddToDoModal'
import { useState } from 'react'
import Card from './Card'
import styles from './ToDoDashboard.module.css'

const ToDoDashboard = () => {
    const [isAddToDoModalOpen, setIsAddToDoModalOpen] = useState(false)
    const [todos, setTodos] = useState([])
    const handleAddBtnClick = () => {
        setIsAddToDoModalOpen(!isAddToDoModalOpen)
    }
  return (
    <>
        <div className='container'>
            <Button className='addBtn' onClick={handleAddBtnClick}>add</Button>
        </div>
        {isAddToDoModalOpen && (
                <AddToDoModal 
                    onClose={() => setIsAddToDoModalOpen(false)} 
                    setTodos={setTodos}
                />
            )}

            <div className={styles.columns}>
                <div className={styles.column}>
                    <h2>To Do</h2>
                    {todos.filter(todo => todo.status === "To Do").map((todo, index) => (
                        <Card key={index} title={todo.title} description={todo.description} />
                    ))}
                </div>
                <div className={styles.column}>
                    <h2>In Progress</h2>
                    {todos.filter(todo => todo.status === "In Progress").map((todo, index) => (
                        <Card key={index} title={todo.title} description={todo.description} />
                    ))}
                </div>
                <div className={styles.column}>
                    <h2>Done</h2>
                    {todos.filter(todo => todo.status === "Done").map((todo, index) => (
                        <Card key={index} title={todo.title} description={todo.description} />
                    ))}
                </div>
                <div className={styles.column}>
                    <h2>Deleted <Button className={styles.clearBtn}>Clear all</Button></h2>
                    {todos.filter(todo => todo.status === "Deleted").map((todo, index) => (
                        <Card key={index} title={todo.title} description={todo.description} />
                    ))}
                </div>
            </div>

    </>
  )
}

export default ToDoDashboard