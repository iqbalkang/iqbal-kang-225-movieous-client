import React from 'react'

const ProgressBar = ({ uploadProgress, message }) => {
  return (
    <div className='absolute top-0 w-full bg-[#aaa] h-4'>
      <div style={{ width: `${uploadProgress}%` }} className='bg-custom-yellow h-full flex justify-center items-center'>
        <p className='text-[10px] font-bold animate-pulse'> {message}</p>
      </div>
    </div>
  )
}

export default ProgressBar
