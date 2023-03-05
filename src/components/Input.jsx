import React, { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {
  const { className, placeholder, type, id, name, value, onchange, ...rest } = props
  return (
    <input
      className={`toggle-input outline-none bg-transparent rounded px-2 py-1 duration-300 peer ${className}`}
      placeholder={placeholder}
      type={type}
      id={id}
      name={name}
      onChange={onchange}
      value={value}
      autoComplete='off'
      {...rest}
    />
  )
})

export default Input
