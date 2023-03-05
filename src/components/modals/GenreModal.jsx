import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import genres from '../../utils/geners'
import Button from '../Button'

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

  const renderGeneres = genres.map(genre => (
    <Genre selectedGeneres={selectedGeneres} genre={genre} onSelect={selectGenre} key={genre} />
  ))

  return (
    <Modal>
      <div className='flex flex-col gap-4 py-4 px-2 h-full'>
        <h2 className='capitalize text-center text-2xl toggle-text'>select geners</h2>
        <div className='flex gap-2 flex-wrap justify-center mb-auto'>{renderGeneres}</div>
        <Button onClick={handleOnClick} className='w-36 justify-self-center self-center toggle-bg'>
          select
        </Button>
      </div>
    </Modal>
  )
}

export default GenreModal

const Genre = ({ selectedGeneres, genre, onSelect }) => {
  const renderGenreStyle = selectedGeneres.includes(genre) ? 'toggle-text toggle-border' : 'border-grayish text-grayish'
  return (
    <p className={'border rounded p-2 cursor-pointer ' + renderGenreStyle} onClick={onSelect.bind(null, genre)}>
      {genre}
    </p>
  )
}
