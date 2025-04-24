import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, type = 'success', onClose }) => {
  return (
    <div className={`${styles.toast} ${styles[type] || ''}`}>
      {message}
      <button className={styles.closeBtn} onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;
