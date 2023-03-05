import React, { useState, useEffect } from 'react'

import Movie from '../../components/Movie'
import Box from './Box'
import useMovies from '../../hooks/useMovies'
import { getMovie } from '../../apis/movie'
import Modal from '../Modal'
import MovieForm from '../MovieForm'
import ConfirmModal from '../modals/ConfirmModal'
import useConfirm from '../../hooks/useConfirm'
import UpdateMovieModal from '../modals/UpdateMovieModal'

const RecentUploads = () => {
  const { recentUploads, fetchLatestMovies } = useMovies()
  const {
    confirmModal,
    toggleModal,
    setMovieModal,
    movieModal,
    closeConfirmModal,
    forceCloseModals,
    toggleFillingForm,
    selectedMovie,
    setSelectedMovie,
  } = useConfirm()

  const handleOnMovieEdit = async id => {
    toggleModal()
    const { data, error } = await getMovie(id)
    setSelectedMovie(data.movie)
  }

  const renderMovies = recentUploads.map(movie => <Movie key={movie._id} movie={movie} onEdit={handleOnMovieEdit} />)

  useEffect(() => {
    fetchLatestMovies(4)
  }, [])

  return (
    <Box className='col-span-2'>
      <h1 className='text-lg font-bold capitalize'>recent uploads</h1>

      <div className='divide-black dark:divide-white divide-y-2'>{renderMovies}</div>

      <UpdateMovieModal
        visible={movieModal}
        closeModal={setMovieModal}
        toggleFillingForm={toggleFillingForm}
        selectedMovie={selectedMovie}
        toggleModal={toggleModal}
      />

      {/* <ConfirmModal visible={confirmModal} closeModal={closeConfirmModal} forceCloseModals={forceCloseModals} /> */}
    </Box>
  )
}

export default RecentUploads
