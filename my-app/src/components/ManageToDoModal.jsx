import React, { useState, useEffect } from 'react';
import Button from './Button';
import BaseField from './BaseField';
import Input from './Input';
import Modal from './Modal';

const ManageToDoModal = ({ onClose, editTitle, editDescription, onSumbmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(editTitle);
    setDescription(editDescription);
  }, [editTitle, editDescription]);

  const onSubmitBtnClick = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSumbmit(title, description)

    // if (editTitle) {

    //   onEditSubmit(title, description);
    // } else {

    //   const newTodo = { 
    //     title, 
    //     description, 
    //     status: "To Do"
    //   };
    //   setTodos(prev => [...prev, newTodo]);
    // }

    // // Сбрасываем поля ввода
    // setTitle('');
    // setDescription('');
    // onClose();
  };

  return (
    <Modal>
      <form className='addForm' onSubmit={onSubmitBtnClick}>
        <div className='header'>
          <h2>{editTitle ? 'Edit ToDo' : 'Add ToDo'}</h2>
          <Button onClick={onClose}>Close</Button>
        </div>
        <BaseField label="Title: ">
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </BaseField>
        <BaseField label="Description: ">
          <Input value={description} onChange={e => setDescription(e.target.value)} />
        </BaseField>
        <Button type="submit">{editTitle ? 'Update' : 'Submit'}</Button>
      </form>
    </Modal>
  );
};

export default ManageToDoModal;