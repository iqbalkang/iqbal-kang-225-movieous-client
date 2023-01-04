import React from 'react'

const AuthCard = ({ children, title }) => {
  return (
    <div className='p-8 shadow-xl dark:bg-background'>
      {title && <h3 className='text-center text-2xl tracking-wider  mb-6 capitalize'>{title}</h3>}

      {children}
    </div>
  )
}

export default AuthCard
