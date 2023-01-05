import React from 'react'

const Input = ({ className, placeholder, type, id, name, value, onchange, ...rest }) => {
  return (
    <input
      className={`outline-none bg-transparent rounded border border-[#aaa] px-2 py-1 md:w-72 focus:border-black dark:focus:border-white duration-300 ${className}`}
      placeholder={placeholder}
      type={type}
      id={id}
      name={name}
      onChange={onchange}
      value={value}
      {...rest}
    />
  )
}

export default Input
