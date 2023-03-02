import React, { useState, useEffect } from 'react'

import Movie from '../../components/Movie'
import Box from './Box'
import useMovies from '../../hooks/useMovies'
import { getMovie } from '../../apis/movie'
import Modal from '../Modal'
import MovieForm from '../MovieForm'

const RecentUploads = () => {
  const { recentUploads, fetchLatestMovies } = useMovies()

  const [movieModal, setMovieModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const toggleModal = () => setMovieModal(prevState => !prevState)

  const handleOnMovieEdit = async id => {
    toggleModal()
    const { data, error } = await getMovie(id)
    setSelectedMovie(data.movie)
  }

  const renderMovies = () =>
    recentUploads.map(movie => <Movie key={movie._id} movie={movie} onEdit={handleOnMovieEdit} />)

  useEffect(() => {
    fetchLatestMovies(4)
  }, [])

  return (
    <Box className='col-span-2'>
      <h1 className='text-lg font-bold capitalize'>recent uploads</h1>

      <div className='divide-black dark:divide-white divide-y-2'>{renderMovies()}</div>

      {movieModal && (
        <Modal closeModal={setMovieModal}>
          <MovieForm closeModal={setMovieModal} visible={movieModal} selectedMovie={selectedMovie} />
        </Modal>
      )}
    </Box>
  )
}

export default RecentUploads
