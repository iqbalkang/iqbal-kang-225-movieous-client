import React from 'react'

const Form = ({ children, onSubmit }) => {
  return (
    <form className='space-y-8' onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
