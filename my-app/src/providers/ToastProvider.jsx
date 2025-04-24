import React from 'react'
import { useState, createContext, useContext } from 'react'
import styles from '../components/Toast.module.css'
import Toast from '../components/Toast'

const ToastContext = createContext()

export const useToast = () => {
  return useContext(ToastContext)
}

export const ToastProvider = ({children}) => {
    const [toast, setToast] = useState(null)
    const [toastType, setToastType] = useState('success')

    const addToast = (message, type='success') => {
        setToast(message)
        setToastType(type)
        setTimeout(() => setToast(null), 3000)
    }

    const removeToast = () => {
      setToast(null)
    }

  return (
    <>
      <ToastContext.Provider value={{addToast, removeToast}}>
        {children}
        {toast && (
          <Toast className={styles.toast} type={toastType} message={toast} onClose={removeToast}/>
        )}
      </ToastContext.Provider>
    </>
  )
}

export default ToastProvider

