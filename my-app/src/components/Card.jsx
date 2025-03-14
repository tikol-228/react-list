import React from 'react'
import Button from './Button'
import styles from './Card.module.css'

const Card = ({ title, description, status, setTodos, index }) => {
  const onNextBtnClick = () => {
    setTodos(prevTodos =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, status: getNextStatus(todo.status) } : todo
      )
    )
  }

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "To Do") return "In Progress"
    if (currentStatus === "In Progress") return "Done"
    return currentStatus
  }
  
  const onEditBtnClick = () => {
    console.log('Editing', title)
  }

  // Обработчик для кнопки удаления
  const onDeleteBtnClick = () => {
    setTodos(prevTodos => prevTodos.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <p className={styles.cardTitle}>Title: {title}</p>
          <p className={styles.cardDescription}>Description: {description}</p>
        </div>
        <div className={styles.cardButtons}>
          <Button onClick={onEditBtnClick}>Edit</Button>
          <Button onClick={onNextBtnClick}>Next</Button>
          <Button onClick={onDeleteBtnClick}>Delete</Button>
        </div>
      </div>
    </>
  )
}

export default Card