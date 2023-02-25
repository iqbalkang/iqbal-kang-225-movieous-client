import React from 'react'
import { MdDeleteOutline, MdOutlineModeEditOutline, MdOpenInFull } from 'react-icons/md'

const Movie = ({ movie }) => {
  const { title, genre = [], status, poster } = movie
  return (
    <div className='flex gap-4 items-center py-2'>
      <img className='w-20 aspect-video h-24' src={poster?.url} alt='' />

      <div className='flex-1'>
        <h3 className='capitalize font-bold text-sm'>{title}</h3>
        <div className='space-x-2 flex'>
          {genre.map((g, index) => (
            <p key={index} className='capitalize text-xs'>
              {g}
            </p>
          ))}
        </div>
      </div>

      <p className='capitalize'>{status}</p>

      <div className='flex gap-2'>
        <button>
          <MdDeleteOutline />
        </button>
        <button>
          <MdOutlineModeEditOutline />
        </button>
        <button>
          <MdOpenInFull />
        </button>
      </div>
    </div>
  )
}

export default Movie
