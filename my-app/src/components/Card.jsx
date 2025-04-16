import React from 'react';
import Button from './Button';
import styles from './Card.module.css';
import { ACTIONS, todoReducer } from '../helpers/todoReducer';
import AddToDoModal from './ManageToDoModal';

const Card = ({ title, description, id, taskStatus, index, draggingId, onEdit, dispatch }) => {
  const onNextBtnClick = () => {
    dispatch({type: ACTIONS.moveNext, payload: id})
  };

  const handleDragStart = () => {
    dispatch({ type: ACTIONS.dragStart, payload: id });
  };

  const onDeleteBtnClick = () => {
    dispatch({type:ACTIONS.delete, payload: id})
  };

  const handleBackBtn = () => {
    dispatch({type: ACTIONS.back, payload: id})
  }

  const reorderTask = (e) => {
    e.preventDefault();
    const targetStatus = e.target.dataset.status;
    dispatch({ type: ACTIONS.drop, payload: targetStatus });
  }

  return (
    <div
          draggable
          onDragStart={() => dispatch({ type: ACTIONS.dragStart, payload: id })}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            dispatch({ type: ACTIONS.reorder, payload: { fromId: draggingId, toId: id } });
          }}
          className={styles.card}
        >
        <div className={styles.cardContent}>
          <p className={styles.cardTitle}>Title: {title}</p>
          <p className={styles.cardDescription}>Description: {description}</p>
        </div>
        <div className={styles.cardButtons}>
          <Button onClick={() => {onEdit(index)}}>Edit</Button>
          {taskStatus !== "To Do" && (
          <Button onClick={handleBackBtn}>Back</Button>
          )}
          {taskStatus !== "Deleted" && (
          <Button onClick={onNextBtnClick}>Next</Button>
          )}
          {taskStatus !== "Deleted" && (
          <Button onClick={onDeleteBtnClick}>Delete</Button>
          )}
        </div>
    </div>
  );
};

export default Card;
