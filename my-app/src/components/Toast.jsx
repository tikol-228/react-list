import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, className, type, onClose }) => {
  return (
    <>
      <div className={`${styles.toast} ${className[type]}`}>
        {message}
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>
    </>
  );
};

export default Toast;