import React from 'react'
import Box from './Box'
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md'

const overlayButtonClasses = 'bg-white h-8 w-8 rounded-full flex justify-center items-center'

const ActorBox = ({ actor }) => {
  const { name, about = '', image } = actor
  return (
    <Box className='relative group'>
      <div className='flex gap-2'>
        <div className='shrink-0'>
          <img src={image} alt={name} className='w-20 h-20' />
        </div>
        <div>
          <h2 className='text-sm font-bold capitalize'>{name}</h2>
          <p className='text-xs'>{about.substring(0, 150)}</p>
        </div>
      </div>

      <div className='absolute inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition'>
        <button className={overlayButtonClasses}>
          <MdDeleteOutline color='red' />
        </button>
        <button className={overlayButtonClasses}>
          <MdOutlineModeEditOutline color='blue' />
        </button>
      </div>
    </Box>
  )
}

export default ActorBox
