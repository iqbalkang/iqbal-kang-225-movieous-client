import React, { useState } from 'react'
import Input from './Input'
import { IoMdClose } from 'react-icons/io'

const Search = ({ placeholder, onSubmit, onReset, className = '' }) => {
  const [value, setValue] = useState('')

  const handleOnChange = e => setValue(e.target.value)

  const handleOnSubmit = e => {
    e.preventDefault()
    onSubmit(value)
  }

  const handleSearchReset = () => {
    setValue('')
    onReset()
  }

  return (
    <form onSubmit={handleOnSubmit} className={'relative ' + className}>
      <Input
        placeholder={placeholder}
        className='placeholder:capitalize w-full transition'
        value={value}
        onchange={handleOnChange}
      />
      {value && (
        <IoMdClose onClick={handleSearchReset} className='absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer' />
      )}
    </form>
  )
}

export default Search
