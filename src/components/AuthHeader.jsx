import React, { useState, useRef } from 'react'
import Search from './Search'
import ThemeToggler from './ThemeToggler'
import { IoAddOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import CreateActorModal from './modals/CreateActorModal'
import CreateMovieModal from './modals/CreateMovieModal'
import ConfirmModal from './modals/ConfirmModal'
import useConfirm from '../hooks/useConfirm'

const AuthHeader = () => {
  const navigate = useNavigate()
  const [createButton, setCreateButton] = useState(false)
  const [actorModal, setActorModal] = useState(false)

  const {
    confirmModal,
    fillingForm,
    setConfirmModal,
    setMovieModal,
    closeConfirmModal,
    forceCloseModals,
    toggleFillingForm,
    createMovieModal,
    setCreateMovieModal,
  } = useConfirm()

  const handleActorModal = () => setActorModal(prevState => !prevState)
  const toggleCreateButton = () => setCreateButton(prevState => !prevState)

  const handleMovieModal = () => {
    if (fillingForm) return setConfirmModal(true)
    setCreateMovieModal(prevState => !prevState)
  }

  const forceCloseConfirmModal = () => setConfirmModal(false)

  const menuRef = useRef()
  const buttonRef = useRef()

  window.addEventListener('click', e => {
    if (e.target !== menuRef.current && e.target !== buttonRef.current) setCreateButton(false)
  })

  const handleSearchSubmit = query => {
    navigate(`/search?title=${query}`)
  }

  const handleSearchReset = () => {
    navigate(-1)
  }

  const forceCloseMovieModal = () => setMovieModal(false)

  return (
    <header className='flex justify-between items-center'>
      <CreateMovieModal
        visible={createMovieModal}
        closeModal={handleMovieModal}
        toggleFillingForm={toggleFillingForm}
        // forceCloseMovieModal={forceCloseMovieModal}
        // fillingForm={fillingForm}
        // closeConfirmModal={closeConfirmModal}
        // forceCloseConfirmModal={forceCloseConfirmModal}
      />

      <CreateActorModal visible={actorModal} closeModal={handleActorModal} />

      {/* <ConfirmModal visible={confirmModal} closeModal={closeConfirmModal} forceCloseModals={forceCloseModals} /> */}

      <Search placeholder='search movies' onSubmit={handleSearchSubmit} onReset={handleSearchReset} />

      <div className='flex gap-2'>
        <ThemeToggler />

        <div className='relative'>
          <button
            ref={buttonRef}
            onClick={toggleCreateButton}
            className='flex items-center border border-grayish px-2 py-1 hover:bg-gray-800 hover:text-white'
          >
            Create <IoAddOutline className='pointer-events-none' />
          </button>
          {createButton && (
            <div className='absolute right-0 top-[110%] bg-gray-800 w-[100px]' ref={menuRef}>
              <button
                className='py-1 border-b border-grayish w-full hover:bg-gray-500 hover:text-white'
                onClick={handleActorModal}
              >
                Add Actor
              </button>
              <button className='py-1 hover:bg-gray-500 w-full hover:text-white' onClick={handleMovieModal}>
                Add Movie
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default AuthHeader
