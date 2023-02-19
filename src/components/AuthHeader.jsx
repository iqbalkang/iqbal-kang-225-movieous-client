import React, { useState, useRef } from 'react'
import Search from './Search'
import ThemeToggler from './ThemeToggler'
import { IoAddOutline } from 'react-icons/io5'
import Modal from './Modal'
import MovieForm from './MovieForm'
import UploadTrailer from './UploadTrailer'

const AuthHeader = () => {
  const [createButton, setCreateButton] = useState(false)
  const [movieModal, setMovieModal] = useState(true)

  const handleMovieModal = () => setMovieModal(prevState => !prevState)

  const toggleCreateButton = () => setCreateButton(prevState => !prevState)

  const menuRef = useRef()
  const buttonRef = useRef()

  window.addEventListener('click', e => {
    if (e.target !== menuRef.current && e.target !== buttonRef.current) setCreateButton(false)
  })

  return (
    <header className='flex justify-between items-center'>
      {movieModal && (
        <Modal visible={movieModal} closeModal={handleMovieModal}>
          {/* <UploadTrailer /> */}
          <MovieForm />
        </Modal>
      )}

      <Search placeholder='search movies' />

      <div className='flex gap-2'>
        <ThemeToggler />

        <div className='relative'>
          <button
            ref={buttonRef}
            onClick={toggleCreateButton}
            className='flex items-center border border-[#aaa] px-2 py-1 hover:bg-gray-800 hover:text-white'
          >
            Create <IoAddOutline className='pointer-events-none' />
          </button>
          {createButton && (
            <div className='absolute right-0 top-[110%] bg-gray-800 w-[100px]' ref={menuRef}>
              <button className='py-1 border-b border-[#aaa] w-full hover:bg-gray-500 hover:text-white'>
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
