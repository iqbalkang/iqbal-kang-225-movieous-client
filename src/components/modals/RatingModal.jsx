import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { AiFillStar } from 'react-icons/ai'
import SubmitButton from '../SubmitButton'

const RatingModal = ({ visible, closeModal }) => {
  if (!visible) return null

  return (
    <Modal closeModal={closeModal} className='h-fit max-w-md rating flex flex-col items-center dark:text-offwhite'>
      <div className='flex justify-center items-center absolute top-0 -translate-y-1/2'>
        <AiFillStar className='h-24 w-24 text-[#E06C9F]' />
        <p className='absolute text-xl text-white'>?</p>
      </div>
      <span className='mt-4 mb-1 capitalize font-semibold'>rate this</span>
      <h2 className='text-accent dark:text-custom-yellow capitalize text-xl font-semibold'>top gun</h2>
      <AiFillStar />
      <form>
        <textarea name='review' id='review' className='resize-none'></textarea>
        <SubmitButton text='rate' />
      </form>
    </Modal>
  )
}

export default RatingModal
