import React from 'react'
import Modal from '../Modal'
import { IoMdClose } from 'react-icons/io'

const WritersModal = ({ visible, closeModal, writers, handleDeleteWriter }) => {
  if (!visible) return null

  return (
    <Modal closeModal={closeModal} className='w-fit h-fit px-6 dark:bg-background'>
      <div className='space-y-4'>
        <RenderWriters writers={writers} handleDeleteWriter={handleDeleteWriter} />
      </div>
    </Modal>
  )
}

const RenderWriters = ({ writers, handleDeleteWriter }) => {
  return writers.map((writer, index) => {
    const { image, name } = writer
    return (
      <div className='flex items-center gap-8 justify-between' key={index}>
        <div className='flex items-center gap-2'>
          <img src={image} alt='' className='h-12 w-12 object-cover rounded-full' />
          <p className='capitalize whitespace-nowrap dark:text-white'>{name}</p>
        </div>
        <IoMdClose
          className='cursor-pointer dark:text-white hover:text-custom-yellow dark:hover:text-custom-yellow'
          onClick={handleDeleteWriter.bind(null, writer)}
        />
      </div>
    )
  })
}

export default WritersModal
