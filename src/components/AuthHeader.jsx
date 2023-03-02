import React, { useState, useRef } from 'react'
import Search from './Search'
import ThemeToggler from './ThemeToggler'
import { IoAddOutline } from 'react-icons/io5'
import Modal from './Modal'
import MovieForm from './MovieForm'
import UploadTrailer from './UploadTrailer'
import ActorForm from './ActorForm'
import { postTrailer } from '../apis/movie'
import ProgressBar from './ProgressBar'
import { useNavigate } from 'react-router-dom'

const AuthHeader = () => {
  const navigate = useNavigate()
  const [createButton, setCreateButton] = useState(false)
  const [movieModal, setMovieModal] = useState(false)
  const [actorModal, setActorModal] = useState(false)

  const handleMovieModal = () => setMovieModal(prevState => !prevState)
  const handleActorModal = () => setActorModal(prevState => !prevState)
  const toggleCreateButton = () => setCreateButton(prevState => !prevState)

  const [videoSelected, setVideoSelected] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoUploaded, setVideoUploaded] = useState(false)
  const [trailerInfo, setTrailerInfo] = useState({})

  const handleChange = async file => {
    setVideoSelected(true)
    const trailer = new FormData()
    trailer.append('trailer', file)

    const { data } = await postTrailer(trailer, setUploadProgress)
    // console.log(data)
    setTrailerInfo(data)
    setVideoUploaded(true)
  }

  const toggleVideoStates = () => {
    setVideoSelected(false)
    setUploadProgress(0)
    setVideoUploaded(false)
  }

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

  return (
    <header className='flex justify-between items-center'>
      {movieModal && (
        <Modal closeModal={handleMovieModal}>
          <UploadTrailer handleChange={handleChange} visible={videoSelected} />
          <ProgressBar videoUploaded={videoUploaded} videoSelected={videoSelected} uploadProgress={uploadProgress} />
          <MovieForm
            visible={videoSelected}
            trailer={trailerInfo}
            closeModal={handleMovieModal}
            toggleVideoStates={toggleVideoStates}
          />
        </Modal>
      )}

      {actorModal && (
        <Modal closeModal={handleActorModal} className='h-auto w-auto px-6'>
          <ActorForm closeModal={handleActorModal} />
        </Modal>
      )}

      <Search placeholder='search movies' onSubmit={handleSearchSubmit} onReset={handleSearchReset} />

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
              <button
                className='py-1 border-b border-[#aaa] w-full hover:bg-gray-500 hover:text-white'
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
