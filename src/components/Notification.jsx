import React from 'react'
import ReactDOM from 'react-dom'

const Notification = ({ message, bgColor }) => {
  return ReactDOM.createPortal(
    <div className='flex justify-center text-white relative z-20'>
      <div className={`fixed top-20 p-2 px-4 rounded first-letter:capitalize gelatine ${bgColor}`}>
        <p>{message}</p>
      </div>
    </div>,
    document.getElementById('notification')
  )
}

export default Notification
