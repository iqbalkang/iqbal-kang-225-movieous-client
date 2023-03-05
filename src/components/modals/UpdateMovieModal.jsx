import React, { useState } from 'react'
import { postTrailer } from '../../apis/movie'
import Modal from '../Modal'
import MovieForm from '../MovieForm'

const UpdateMovieModal = ({ visible, closeModal, toggleFillingForm, selectedMovie, toggleModal }) => {
  if (!visible) return null

  return (
    <Modal closeModal={toggleModal}>
      <MovieForm toggleFillingForm={toggleFillingForm} closeModal={closeModal} selectedMovie={selectedMovie} />
    </Modal>
  )
}

export default UpdateMovieModal
