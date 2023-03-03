import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ children, closeModal, className = '' }) => {
  const innerDivClasses = `fixed py-6 rounded bg-white dark:bg-modal w-[40rem] h-[35rem] shadow-md cursor-auto overflow-y-scroll ${className}`

  const handleModal = e => {
    e.stopPropagation()
    if (e.target.classList.contains('backdrop')) return closeModal ? closeModal() : null
  }

  return ReactDOM.createPortal(
    <div
      className='absolute inset-0 flex flex-col justify-center items-center bg-body bg-opacity-50 backdrop-blur-sm z-10 cursor-pointer backdrop'
      onClick={handleModal}
    >
      <div className={innerDivClasses}>{children}</div>
    </div>,
    document.getElementById('modal')
  )
}

export default Modal
