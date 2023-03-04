import React, { createContext, useState } from 'react'

export const ConfirmModalContext = createContext()

const ConfirmModalProvider = ({ children }) => {
  const [confirmModal, setConfirmModal] = useState(false)
  const [fillingForm, setFillingForm] = useState(false)
  const [movieModal, setMovieModal] = useState(false)
  const [createMovieModal, setCreateMovieModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  // console.log(fillingForm)

  const toggleModal = () => {
    if (fillingForm) return setConfirmModal(true)
    setMovieModal(prevState => !prevState)
  }

  const closeConfirmModal = () => {
    setConfirmModal(false)
  }

  const toggleFillingForm = () => {
    // setConfirmModal(true)
    setFillingForm(true)
  }

  const forceCloseModals = () => {
    setFillingForm(false)
    setMovieModal(false)
    setConfirmModal(false)
    setCreateMovieModal(false)
    setSelectedMovie(null)
  }

  return (
    <ConfirmModalContext.Provider
      value={{
        confirmModal,
        fillingForm,
        setConfirmModal,
        setFillingForm,
        toggleModal,
        movieModal,
        setMovieModal,
        closeConfirmModal,
        forceCloseModals,
        toggleFillingForm,
        selectedMovie,
        setSelectedMovie,
        createMovieModal,
        setCreateMovieModal,
      }}
    >
      {children}
    </ConfirmModalContext.Provider>
  )
}

export default ConfirmModalProvider
