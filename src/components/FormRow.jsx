import React from 'react'
import Input from './Input'

const FormRow = ({ placeholder, name, type = 'text', label, value, onchange, ...rest }) => {
  return (
    <div className='flex flex-col-reverse gap-1'>
      <Input
        placeholder={placeholder}
        className='peer'
        type={type}
        id={name}
        name={name}
        value={value}
        onchange={onchange}
        {...rest}
      />
      <label
        htmlFor={name}
        className='capitalize text-[#aaa] peer-focus:text-black dark:peer-focus:text-white cursor-pointer self-start'
      >
        {label || name}
      </label>
    </div>
  )
}

export default FormRow
