import React from 'react'

const BaseField = ({label, children}) => {
  return (
    <>
        <div>
            <label>{label}</label>
            {children}
        </div>
    </>
  )
}

export default BaseField