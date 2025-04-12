import React from 'react';
import Button from './Button';
import styles from './Card.module.css';
import { ACTIONS, todoReducer } from '../helpers/todoReducer';
import AddToDoModal from './ManageToDoModal';

const Card = ({ title, description, setTodos, index, onEdit, dispatch }) => {
  const onNextBtnClick = () => {
    dispatch({type: ACTIONS.moveNext, payload: index})
  };

  const onDeleteBtnClick = () => {
    dispatch({type:ACTIONS.delete, payload: index})
    console.log(1)
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>Title: {title}</p>
        <p className={styles.cardDescription}>Description: {description}</p>
      </div>
      <div className={styles.cardButtons}>
        <Button onClick={() => {onEdit(index)}}>Edit</Button>
        <Button onClick={onNextBtnClick}>Next</Button>
        <Button onClick={onDeleteBtnClick}>Delete</Button>
      </div>
    </div>
  );
};

export default Card;
