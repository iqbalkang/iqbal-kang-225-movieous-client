import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ children, closeModal }) => {
  const handleMovieModal = e => {
    if (e.target.classList.contains('backdrop')) closeModal()
  }

  return ReactDOM.createPortal(
    <div
      className='absolute inset-0 flex justify-center items-center bg-body bg-opacity-50 backdrop-blur-sm z-10 cursor-pointer backdrop'
      onClick={handleMovieModal}
    >
      {children}
    </div>,
    document.getElementById('modal')
  )
}

export default Modal
