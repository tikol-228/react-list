import React from 'react';
import Button from './Button';
import styles from './Card.module.css';

const Card = ({ title, description, status, setTodos, index, onEdit }) => {
  const onNextBtnClick = () => {
    setTodos(prevTodos =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, status: getNextStatus(todo.status) } : todo
      )
    );
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "To Do") return "In Progress";
    if (currentStatus === "In Progress") return "Done";
    if (currentStatus === "Done") return "Deleted"; // Перемещение в Deleted
    return currentStatus;
  };
  
  const onEditBtnClick = () => {
    onEdit(index); // Вызов функции редактирования
  };

  const onDeleteBtnClick = () => {
    setTodos(prevTodos => prevTodos.map((todo, i) =>
      i === index ? { ...todo, status: "Deleted" } : todo
    ));
  };

  return (
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
  );
};

export default Card;
