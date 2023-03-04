import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import genres from '../../utils/geners'

const GenreModal = ({ visible, closeModal, updateGenres, genre }) => {
  const [selectedGeneres, setSelectedGeneres] = useState([])

  const selectGenre = genre => {
    if (selectedGeneres.includes(genre)) {
      const remainingGenres = selectedGeneres.filter(oldGenre => oldGenre !== genre)
      return setSelectedGeneres(remainingGenres)
    }
    setSelectedGeneres([...selectedGeneres, genre])
  }

  const handleOnClick = () => {
    updateGenres(selectedGeneres)
    closeModal()
  }

  useEffect(() => {
    setSelectedGeneres(genre)
  }, [genre])

  if (!visible) return null

  const generateGeneres = () =>
    genres.map((genre, index) => (
      <p
        key={index}
        className={`${
          selectedGeneres.includes(genre) ? 'dark:border-white dark:text-white' : 'border-[#aaa] dark:text-[#aaa]'
        } border rounded p-2 cursor-pointer`}
        onClick={selectGenre.bind(null, genre)}
      >
        {genre}
      </p>
    ))

  return (
    <Modal>
      <div className='flex flex-col gap-4 items-center py-4 px-2 h-full'>
        <h2 className='dark:text-white capitalize text-center text-2xl'>select geners</h2>
        <div className='flex gap-2 flex-wrap justify-center'>{generateGeneres()}</div>
        <button className='dark:bg-white p-1 px-12 rounded mt-auto' onClick={handleOnClick}>
          Select
        </button>
      </div>
    </Modal>
  )
}

export default GenreModal
