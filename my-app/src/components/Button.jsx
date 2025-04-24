import React from 'react'

const Button = ({children,onClick,onMouseEnter,onMouseLeave,className}) => {
  return (
    <button onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>{children}</button>
  )
}

export default React.memo(Button);