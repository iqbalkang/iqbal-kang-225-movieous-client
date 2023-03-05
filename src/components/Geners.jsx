import React from 'react'
import { FaTheaterMasks } from 'react-icons/fa'

const Geners = ({ openModal, genre }) => {
  const handleOnClick = () => openModal()

  const renderClasses = genre.length > 0 ? 'toggle-border toggle-text' : 'border-grayish text-grayish'

  return (
    <button
      onClick={handleOnClick}
      type='button'
      className={'flex items-center  gap-2 rounded border p-1 px-3 ' + renderClasses}
    >
      <FaTheaterMasks />
      {genre.length > 0 ? 'Selected ' : 'Select '}
      Genres
    </button>
  )
}

export default Geners
