import React, { createContext, useState } from 'react'

export const ConfirmModalContext = createContext()

const ConfirmModalProvider = ({ children }) => {
  const [confirmModal, setConfirmModal] = useState(false)
  const [fillingForm, setFillingForm] = useState(false)
  const [createMovieModal, setCreateMovieModal] = useState(false)
  const [updateMovieModal, setUpdateMovieModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const toggleFillingForm = () => setFillingForm(true)

  const toggleCreateMovieModal = () => {
    if (fillingForm) return setConfirmModal(true)
    setCreateMovieModal(prevState => !prevState)
  }

  const toggleUpdateMovieModal = () => {
    if (fillingForm) return setConfirmModal(true)
    setUpdateMovieModal(prevState => !prevState)
  }

  const closeConfirmModal = () => {
    setConfirmModal(false)
  }

  const forceCloseModals = () => {
    setFillingForm(false)
    setUpdateMovieModal(false)
    setConfirmModal(false)
    setCreateMovieModal(false)
    setSelectedMovie(null)
  }

  return (
    <ConfirmModalContext.Provider
      value={{
        toggleCreateMovieModal,
        confirmModal,
        fillingForm,
        setConfirmModal,
        setFillingForm,
        toggleUpdateMovieModal,
        updateMovieModal,
        setUpdateMovieModal,
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
