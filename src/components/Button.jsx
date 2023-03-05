import React from 'react'

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={'capitalize rounded px-4 py-1 ' + className}>
      {children}
    </button>
  )
}

export default Button
