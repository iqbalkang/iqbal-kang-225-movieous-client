import React, { useState, useEffect } from 'react'
import Movie from '../components/Movie'
import Pagination from '../components/Pagination'
import MovieForm from '../components/MovieForm'
import Modal from '../components/Modal'
import { getMovie } from '../apis/movie'
import useMovies from '../hooks/useMovies'
import useConfirm from '../hooks/useConfirm'
import ConfirmModal from '../components/modals/ConfirmModal'
import CreateMovieModal from '../components/modals/CreateMovieModal'
import UpdateMovieModal from '../components/modals/UpdateMovieModal'

const Movies = () => {
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

  // const [movieModal, setMovieModal] = useState(false)
  // const [selectedMovie, setSelectedMovie] = useState(null)

  const { fetchMovies, currentPage, handleNext, handlePrev, movies } = useMovies()

  // const toggleModal = () => setMovieModal(prevState => !prevState)

  const handleOnMovieEdit = async id => {
    toggleModal()
    const { data, error } = await getMovie(id)
    if (error) return console.log(error)
    setSelectedMovie(data.movie)
  }

  useEffect(() => {
    fetchMovies()
  }, [currentPage])

  const renderMovies = movies.map(movie => <Movie key={movie._id} movie={movie} onEdit={handleOnMovieEdit} />)

  return (
    <div className='grid max-w-3xl'>
      <div className='divide-black dark:divide-white divide-y-2'>{renderMovies}</div>
      <Pagination handlePrev={handlePrev} handleNext={handleNext} />

      <UpdateMovieModal
        visible={movieModal}
        closeModal={setMovieModal}
        toggleFillingForm={toggleFillingForm}
        selectedMovie={selectedMovie}
        toggleModal={toggleModal}

        // fillingForm={fillingForm}
        // closeConfirmModal={closeConfirmModal}
        // forceCloseConfirmModal={forceCloseConfirmModal}
      />

      {/* {movieModal && (
        <Modal closeModal={toggleModal}>
          <MovieForm
            visible={movieModal}
            closeModal={setMovieModal}
            toggleFillingForm={toggleFillingForm}
            selectedMovie={selectedMovie}
          />
        </Modal>
      )} */}
      <ConfirmModal visible={confirmModal} closeModal={closeConfirmModal} forceCloseModals={forceCloseModals} />
    </div>
  )
}

export default Movies
