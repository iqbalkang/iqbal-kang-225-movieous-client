import React from 'react'

const Pagination = ({ handlePrev, handleNext }) => {
  return (
    <div className='flex gap-4 justify-self-end  mt-4'>
      <button className='capitalize hover:underline' onClick={handlePrev}>
        prev
      </button>
      <button className='capitalize hover:underline' onClick={handleNext}>
        next
      </button>
    </div>
  )
}

export default Pagination
