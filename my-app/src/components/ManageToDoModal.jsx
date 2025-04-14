import React, { useState, useEffect } from 'react';
import Button from './Button';
import BaseField from './BaseField';
import Input from './Input';
import Modal from './Modal';
import styles from './ManageToDoModal.module.css';

const ManageToDoModal = ({ onClose, editTitle, editDescription, onSumbmit, onEditSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(editTitle);
    setDescription(editDescription);
  }, [editTitle, editDescription]);

  const onSubmitBtnClick = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
  
    if (editTitle && onEditSubmit) {
      onEditSubmit(title, description);
    } else {
      onSumbmit(title, description);
    }
  
    onClose();
  };
  

  return (
    <Modal>
      <form className={styles.addForm} onSubmit={onSubmitBtnClick}>
        <div className={styles.header}>
          <h2>{editTitle ? 'Edit ToDo' : 'Add ToDo'}</h2>
          <Button className={styles.closeButton} onClick={onClose}></Button>
        </div>
        <BaseField className={styles.field} label="Title: ">
          <Input className={styles.modalInput} value={title} onChange={e => setTitle(e.target.value)} />
        </BaseField>
        <BaseField className={styles.field} label="Description: ">
          <Input className={styles.input} value={description} onChange={e => setDescription(e.target.value)} />
        </BaseField>
        <Button className={styles.submitButton} type="submit">{editTitle ? 'Update' : 'Submit'}</Button>
      </form>
    </Modal>
  );
};

export default ManageToDoModal;