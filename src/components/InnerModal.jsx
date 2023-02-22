import React from 'react'

const InnerModal = ({ children, closeModal }) => {
  const handleModal = e => {
    if (e.target.classList.contains('backdrop2')) closeModal()
  }

  return (
    <div
      className='absolute inset-0 flex items-center justify-center backdrop-blur-md z-30 cursor-pointer backdrop2'
      onClick={handleModal}
    >
      <div className='dark:bg-background cursor-auto p-4 text-white'>{children}</div>
    </div>
  )
}

export default InnerModal
