import React, { useState } from 'react'
import { postTrailer } from '../../apis/movie'
import Modal from '../Modal'
import MovieForm from '../MovieForm'

const UpdateMovieModal = ({ visible, closeModal, selectedMovie }) => {
  if (!visible) return null

  return (
    <Modal closeModal={closeModal}>
      <MovieForm selectedMovie={selectedMovie} />
    </Modal>
  )
}

export default UpdateMovieModal
