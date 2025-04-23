import React, { useState, useEffect, useCallback, useRef } from 'react';
import Button from './Button';
import BaseField from './BaseField';
import Input from './Input';
import Modal from './Modal';
import styles from './ManageToDoModal.module.css';

const ManageToDoModal = ({ onClose, editTitle, editDescription, onSubmit, onEditSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const inputRef = useRef(null)

  useEffect(() => {
    setTitle(editTitle);
    setDescription(editDescription);
  }, [editTitle, editDescription]);

  useEffect(() => {
    // Когда модалка открыта, устанавливаем фокус на input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value)
  },[])

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value)
  },[])

  const onSubmitBtnClick = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
  
    if (editTitle && onEditSubmit) {
      onEditSubmit(title, description);
    } else {
      onSubmit(title, description);
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
          <Input className={styles.modalInput} value={title} ref={inputRef} onChange={handleTitleChange} />
        </BaseField>
        <BaseField className={styles.field} label="Description: ">
          <Input className={styles.input} value={description} onChange={handleDescriptionChange} />
        </BaseField>
        <Button className={styles.submitButton} type="submit">{editTitle ? 'Update' : 'Submit'}</Button>
      </form>
    </Modal>
  );
};

export default ManageToDoModal;