import React from 'react'
import Input from './Input'
import Label from './Label'

const FormRow = ({ placeholder, name, type = 'text', label, value, onchange, ...rest }) => {
  return (
    <div className='flex flex-col-reverse gap-1'>
      <Input
        placeholder={placeholder}
        className='peer md:w-72'
        type={type}
        id={name}
        name={name}
        value={value}
        onchange={onchange}
        {...rest}
      />
      <Label htmlFor={name} className='text-base'>
        {label || name}
      </Label>
    </div>
  )
}

export default FormRow
