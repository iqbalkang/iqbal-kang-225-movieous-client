import React from 'react'
import Modal from '../Modal'
import { IoMdClose } from 'react-icons/io'

const CastModal = ({ visible, closeModal, cast, handleDeleteCast }) => {
  if (!visible) return null

  return (
    <Modal closeModal={closeModal} className='w-fit h-fit max-h-[30rem] px-6 dark:bg-background'>
      <div className='space-y-4'>
        <CastMember cast={cast} handleDeleteCast={handleDeleteCast} />
      </div>
    </Modal>
  )
}

export default CastModal

const CastMember = ({ cast, handleDeleteCast }) => {
  return cast.map((member, index) => {
    const { image, name } = member.actor
    return (
      <div className='flex items-center gap-8 justify-between' key={index}>
        <div className='flex items-center gap-2'>
          <img src={image} alt='' className='h-12 w-12 bg-red-400 object-cover rounded-full' />
          <div>
            <p className='capitalize whitespace-nowrap dark:text-white'>{name}</p>
            {member.leadActor && (
              <span className='text-[10px] bg-white rounded-full p-1 text-black capitalize'>lead actor</span>
            )}
          </div>
        </div>
        <IoMdClose
          className='cursor-pointer dark:text-white hover:text-custom-yellow dark:hover:text-custom-yellow'
          onClick={handleDeleteCast.bind(null, index)}
        />
      </div>
    )
  })
}
