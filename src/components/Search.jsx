import React from 'react'
import Input from './Input'

const Search = ({ placeholder }) => {
  return <Input placeholder={placeholder} className='placeholder:capitalize md:focus:w-80' />
}

export default Search
