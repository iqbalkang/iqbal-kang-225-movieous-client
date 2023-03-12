import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

const SubmitButton = ({ onClick, uploading, text }) => {
  return (
    <button
      onClick={onClick}
      className='w-full capitalize bg-blackish text-white dark:bg-offwhite dark:text-black  h-10 rounded font-bold hover:bg-black dark:hover:bg-white hover:shadow dark:hover:shadow-white hover:shadow-black duration-200 flex justify-center items-center'
    >
      {uploading ? <ImSpinner2 className='animate-spin' /> : text}
    </button>
  )
}

export default SubmitButton
