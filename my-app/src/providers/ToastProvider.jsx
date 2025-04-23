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
    const [toastType, setToastType] = useState('succes')

    const addToast = (message) => {
        setToast(message)
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
          <Toast className={styles.toast} message={toast} onClose={removeToast}/>
        )}
      </ToastContext.Provider>
    </>
  )
}

export default ToastProvider

