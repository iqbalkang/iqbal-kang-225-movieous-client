import React, { useState, useEffect } from 'react'
import Movie from '../components/Movie'
import Pagination from '../components/Pagination'
import { deleteMovie, getMovie } from '../apis/movie'
import useMovies from '../hooks/useMovies'
import useConfirm from '../hooks/useConfirm'
import UpdateMovieModal from '../components/modals/UpdateMovieModal'
import ConfirmModal from '../components/modals/ConfirmModal'

const Movies = () => {
  const { toggleUpdateMovieModal, updateMovieModal, selectedMovie, setSelectedMovie } = useConfirm()

  const [confirmModal, setConfirmModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState('')

  const { fetchMovies, currentPage, handleNext, handlePrev, movies } = useMovies()

  const handleOnMovieEdit = async id => {
    toggleUpdateMovieModal()
    const { data, error } = await getMovie(id)
    if (error) return console.log(error)
    setSelectedMovie(data.movie)
  }

  const handleOnMovieDelete = async id => {
    setLoading(true)
    const { data, error } = await deleteMovie(selectedMovieId)
    if (error) return console.log(error)
    setLoading(false)
    setConfirmModal(false)
    if (data.status === 'success') await fetchMovies()
  }

  const openConfirmModal = id => {
    setConfirmModal(prevState => !prevState)
    setSelectedMovieId(id)
  }

  const closeConfirmModal = () => setConfirmModal(false)

  useEffect(() => {
    fetchMovies()
  }, [currentPage])

  const renderMovies = movies.map(movie => (
    <Movie key={movie._id} movie={movie} onEdit={handleOnMovieEdit} onDelete={openConfirmModal} />
  ))

  return (
    <div className='grid max-w-3xl'>
      <div className='divide-black dark:divide-white divide-y-2'>{renderMovies}</div>
      <Pagination handlePrev={handlePrev} handleNext={handleNext} />

      <UpdateMovieModal visible={updateMovieModal} closeModal={toggleUpdateMovieModal} selectedMovie={selectedMovie} />
      <ConfirmModal
        visible={confirmModal}
        closeModal={closeConfirmModal}
        forceCloseModals={handleOnMovieDelete}
        text='this action will permanently delete the movie.'
        loading={loading}
      />
    </div>
  )
}

export default Movies
