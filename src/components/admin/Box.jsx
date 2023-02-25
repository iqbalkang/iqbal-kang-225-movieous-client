import React from 'react'

const Box = ({ children, className }) => {
  return <div className={`bg-[#ddd] dark:bg-modal p-4  shadow-sm ${className}`}> {children} </div>
}

export default Box
