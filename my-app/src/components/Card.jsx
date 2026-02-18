import React from 'react';
import Button from './Button';
import styles from './Card.module.css';
import { ACTIONS } from '../helpers/todoReducer';

const Card = ({ title, description, id, taskStatus, onEdit, onMoveNext, onDelete, onBack, colRefs }) => {
  const onNextBtnClick = () => {
    if (typeof onMoveNext === 'function') onMoveNext(id);
  };

  const onDeleteBtnClick = () => {
    if (typeof onDelete === 'function') onDelete(id);
  };

  const handleBackBtn = () => {
    if (typeof onBack === 'function') onBack(id);
  };

  // Подсветка следующей колонки при наведении на кнопку Next
  const statuses = ['To Do', 'In Progress', 'Done', 'Deleted'];
  const currentIndex = statuses.indexOf(taskStatus);
  const nextStatus = statuses[currentIndex + 1]; // Находим следующий статус

  const handleNextCardMouseEnter = () => {
    if (!nextStatus) return; // Если следующего статуса нет, ничего не делаем
    const nextCol = colRefs?.current?.[nextStatus]; // Находим следующую колонку
    if (nextCol) {
      nextCol.classList.add(styles.highlightColumn); // Добавляем подсветку
    }
  };

  const handleNextCardMouseLeave = () => {
    if (!nextStatus) return; // Если следующего статуса нет, ничего не делаем
    const nextCol = colRefs?.current?.[nextStatus];
    if (nextCol) {
      nextCol.classList.remove(styles.highlightColumn); // Убираем подсветку
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>Title: {title}</p>
        <p className={styles.cardDescription}>Description: {description}</p>
      </div>
      <div className={styles.cardButtons}>
        <Button onClick={() => onEdit(id)}>Edit</Button>
        {taskStatus !== 'To Do' && <Button onClick={handleBackBtn}>Back</Button>}
        {taskStatus !== 'Deleted' && (
          <Button
            onClick={onNextBtnClick}
            onMouseEnter={handleNextCardMouseEnter}
            onMouseLeave={handleNextCardMouseLeave}
          >
            Next
          </Button>
        )}
        {taskStatus !== 'Deleted' && <Button onClick={onDeleteBtnClick}>Delete</Button>}
      </div>
    </div>
  );
};

export default Card;