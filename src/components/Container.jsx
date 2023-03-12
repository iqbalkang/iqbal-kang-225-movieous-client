import React from 'react'

const Container = ({ children }) => {
  return (
    <div className='w-full h-full flex-1 max-w-7xl mx-auto px-4 xl:px-0 flex flex-col justify-center'>{children}</div>
  )
}

export default Container
