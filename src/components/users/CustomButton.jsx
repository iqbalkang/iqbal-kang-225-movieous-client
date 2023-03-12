import React from 'react'

const CustomButton = ({ children, onClick, notButton = false }) => {
  const commonClasses = `text-accent dark:text-custom-yellow capitalize `
  if (notButton) return <p className={commonClasses}>{children}</p>
  return (
    <button className={commonClasses + 'hover:underline'} onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton
