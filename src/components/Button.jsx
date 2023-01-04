import React from 'react'

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='w-full capitalize bg-[#333] text-white dark:bg-[#eee] dark:text-black py-2 rounded font-bold hover:bg-black dark:hover:bg-white hover:shadow dark:hover:shadow-white hover:shadow-black duration-200 flex justify-center'
    >
      {children}
    </button>
  )
}

export default Button
