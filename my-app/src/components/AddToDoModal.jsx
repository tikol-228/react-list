import React from 'react'
import Button from './Button'
import BaseField from './BaseField'
import Input from './Input'
import { useState } from 'react'
import Modal from './Modal'

const AddToDoModal = ({onClose, setTodos}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onSubmitBtnClick = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    
    const newTodo = { 
        title, 
        description, 
        status: "To Do"
    }

    console.log('New ToDo:', newTodo)
    setTodos(prev => [...prev, newTodo])
    onClose()
  }


  return (
   <>
    <Modal>
      <form className='addForm' onSubmit={onSubmitBtnClick}>
          <div className='header'>
            <h2>Add ToDo</h2>
            <Button onClick={onClose}>Close</Button>
          </div>
          <BaseField label="Title: ">
          <Input value={title} onChange={e => setTitle(e.target.value)}/>
          </BaseField>
          <BaseField label="Description: ">
          <Input value={description} onChange={e => setDescription(e.target.value)}/>
          </BaseField>
          <Button type="submit">Submit</Button>
      </form>
    </Modal>
   </>
  )
}

export default AddToDoModal