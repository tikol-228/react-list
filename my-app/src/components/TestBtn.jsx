import React from 'react'

const TestBtn = ({children, onClick}) => {
    
  return (
    <>
    <button onClick={onClick}>{children}</button>
    </>
  )
}

export default React.memo(TestBtn)