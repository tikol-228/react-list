import React from 'react'

const areEqual = (prevProps, nextProps) => {
  console.log(1, prevProps.className === nextProps.className);
  console.log(2, prevProps.children, prevProps.children === nextProps.children);
  console.log(3, prevProps.onClick === nextProps.onClick);
  };
  

const Button = ({children,onClick,className}) => {
  return (
    <button onClick={onClick} className={className}>{children}</button>
  )
}

export default React.memo(Button, areEqual);