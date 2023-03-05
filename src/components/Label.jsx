import React from 'react'

const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={
        'text-grayish capitalize text-sm cursor-pointer peer-focus:text-black dark:peer-focus:text-white self-start ' +
        className
      }
    >
      {children}
    </label>
  )
}

export default Label
