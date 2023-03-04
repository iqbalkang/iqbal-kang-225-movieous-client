import React, { useState, useEffect } from 'react'

import Movie from '../../components/Movie'
import Box from './Box'
import useMovies from '../../hooks/useMovies'
import { getMovie } from '../../apis/movie'
import Modal from '../Modal'
import MovieForm from '../MovieForm'
import ConfirmModal from '../modals/ConfirmModal'
import useConfirm from '../../hooks/useConfirm'

const RecentUploads = () => {
  const { recentUploads, fetchLatestMovies } = useMovies()
  const {
    confirmModal,
    fillingForm,
    setConfirmModal,
    setFillingForm,
    toggleModal,
    setMovieModal,
    movieModal,
    closeConfirmModal,
    forceCloseModals,
    toggleFillingForm,
    selectedMovie,
    setSelectedMovie,
  } = useConfirm()

  // const [confirmModal, setConfirmModal] = useState(false)
  // const [fillingForm, setFillingForm] = useState(false)

  // const [movieModal, setMovieModal] = useState(false)
  //  ! const [selectedMovie, setSelectedMovie] = useState(null)

  // const toggleModal = () => {
  //   if (fillingForm) return setConfirmModal(true)
  //   setMovieModal(prevState => !prevState)
  // }

  // const closeConfirmModal = () => {
  //   setConfirmModal(false)
  // }

  // const toggleFillingForm = () => {
  //   // setConfirmModal(true)
  //   setFillingForm(true)
  // }

  // const forceCloseModals = () => {
  //   setFillingForm(false)
  //   setMovieModal(false)
  //   setConfirmModal(false)
  // }

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
        <Modal closeModal={toggleModal}>
          <MovieForm
            closeModal={setMovieModal}
            visible={movieModal}
            selectedMovie={selectedMovie}
            toggleFillingForm={toggleFillingForm}
          />
        </Modal>
      )}

      <ConfirmModal visible={confirmModal} closeModal={closeConfirmModal} forceCloseModals={forceCloseModals} />
    </Box>
  )
}

export default RecentUploads
