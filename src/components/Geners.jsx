import React from 'react'
import { FaTheaterMasks } from 'react-icons/fa'

const Geners = ({ openModal, genre }) => {
  const handleOnClick = () => openModal()

  return (
    <button
      onClick={handleOnClick}
      type='button'
      className={`${
        genre.length > 0 ? 'dark:border-white dark:text-white' : 'dark:border-[#aaa] dark:text-[#aaa]'
      } flex items-center  gap-2 rounded border  p-1 px-3`}
    >
      <FaTheaterMasks />
      {genre.length > 0 ? 'Selected ' : 'Select '}
      Genres
    </button>
  )
}

export default Geners
