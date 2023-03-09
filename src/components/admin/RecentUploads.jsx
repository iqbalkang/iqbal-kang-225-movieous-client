import React, { useState, useEffect } from 'react'

import Movie from '../../components/Movie'
import Box from './Box'
import useMovies from '../../hooks/useMovies'
import { deleteMovie, getMovie } from '../../apis/movie'
import useConfirm from '../../hooks/useConfirm'
import UpdateMovieModal from '../modals/UpdateMovieModal'
import ConfirmModal from '../modals/ConfirmModal'

const RecentUploads = () => {
  const { recentUploads, fetchLatestMovies } = useMovies()
  const { updateMovieModal, toggleUpdateMovieModal, toggleFillingForm, selectedMovie, setSelectedMovie } = useConfirm()

  const [confirmModal, setConfirmModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState('')

  const handleOnMovieEdit = async id => {
    toggleUpdateMovieModal()
    const { data, error } = await getMovie(id)
    setSelectedMovie(data.movie)
  }

  const handleOnMovieDelete = async id => {
    setLoading(true)
    const { data, error } = await deleteMovie(selectedMovieId)
    if (error) return console.log(error)
    setLoading(false)
    if (data.status === 'success') await fetchLatestMovies(4)
    setConfirmModal(false)
  }

  const openConfirmModal = id => {
    setConfirmModal(prevState => !prevState)
    setSelectedMovieId(id)
  }

  const closeConfirmModal = () => setConfirmModal(false)

  const renderMovies = recentUploads.map(movie => (
    <Movie key={movie._id} movie={movie} onEdit={handleOnMovieEdit} onDelete={openConfirmModal} />
  ))

  useEffect(() => {
    fetchLatestMovies(4)
  }, [])

  return (
    <Box className='col-span-2'>
      <h1 className='text-lg font-bold capitalize'>recent uploads</h1>

      <div className='divide-black dark:divide-white divide-y-2'>{renderMovies}</div>

      <UpdateMovieModal visible={updateMovieModal} closeModal={toggleUpdateMovieModal} selectedMovie={selectedMovie} />
      <ConfirmModal
        visible={confirmModal}
        closeModal={closeConfirmModal}
        forceCloseModals={handleOnMovieDelete}
        text='this action will permanently delete the movie.'
        loading={loading}
      />
    </Box>
  )
}

export default RecentUploads
