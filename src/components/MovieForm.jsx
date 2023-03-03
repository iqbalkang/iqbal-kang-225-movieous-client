import React, { useState, useEffect } from 'react'
import Tags from './Tags'
import { results } from '../utils/fakeData'
import LiveSearch from './LiveSearch'
import InnerModal from './InnerModal'
import { IoMdClose } from 'react-icons/io'
import CastForm from './CastForm'
import PosterUploader from './PosterUploader'
import Geners from './Geners'
import Modal from './Modal'
import GenreModal from './modals/GenreModal'
import Select from './Select'
import options, { languageOptions, statusOptions, typeOptions } from '../utils/options'
import useNotification from '../hooks/useNotification'
import { postMovie, updateMovie } from '../apis/movie'
import validateMovie from '../utils/validateMovie'
import { ImSpinner2 } from 'react-icons/im'
import WritersModal from './modals/WritersModal'
import LiveSearch2 from './LiveSearch2'

const defaultMovieInfo = {
  title: '',
  storyLine: '',
  tags: [],
  director: null,
  writers: [],
  cast: [],
  releaseDate: '',
  status: '',
  type: '',
  language: '',
  genre: [],
  poster: {},
  trailer: {},
}

const MovieForm = ({ trailer, closeModal, selectedMovie, toggleVideoStates }) => {
  const { renderNotification } = useNotification()

  const [movieInfo, setMovieInfo] = useState(defaultMovieInfo)
  const [writersModal, setWritersModal] = useState(false)
  const [selectedPoster, setSelectedPoster] = useState('')
  const [showGenresModal, setShowGenresModal] = useState(false)
  const [uploading, setUploading] = useState(false)

  const { title, storyLine, director, writers, genre, tags } = movieInfo

  const handleOnChange = e => {
    const { name, value, files } = e.target

    if (name === 'poster') {
      const poster = files[0]
      setSelectedPoster(URL.createObjectURL(poster))
      return setMovieInfo({ ...movieInfo, poster })
    }

    setMovieInfo({ ...movieInfo, [name]: value })
  }

  const updateTags = tags => {
    setMovieInfo({ ...movieInfo, tags })
  }

  const updateDirector = director => {
    setMovieInfo({ ...movieInfo, director })
  }

  const updateWriters = selectedWriter => {
    const writerIndex = writers.findIndex(writer => writer.actorId === selectedWriter.actorId)
    if (writerIndex !== -1) return null
    setMovieInfo({ ...movieInfo, writers: [...writers, selectedWriter] })
  }

  const updateCast = cast => {
    for (let member of movieInfo.cast) {
      if (member.actor._id === cast.actor._id) return null
    }
    setMovieInfo({ ...movieInfo, cast: [...movieInfo.cast, cast] })
  }

  const updateGenres = genres => {
    setMovieInfo({ ...movieInfo, genre: genres })
  }

  const toggleWritersModal = () => setWritersModal(prevState => !prevState)
  const toggleGenresModal = () => setShowGenresModal(prevState => !prevState)

  const handleDeleteWriter = writer => {
    const remainingWriters = movieInfo.writers.filter(singleWriter => singleWriter.name !== writer.name)
    setMovieInfo({ ...movieInfo, writers: remainingWriters })
  }

  const handleDeleteCast = castIndex => {
    const remainingCast = movieInfo.cast.filter((_, index) => index !== castIndex)
    setMovieInfo({ ...movieInfo, cast: remainingCast })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const { error } = validateMovie(movieInfo)
    if (error) return renderNotification('error', error)

    setUploading(true)

    const { tags, genre, cast, director, writers, poster } = movieInfo

    const formData = new FormData()

    const updatedMovieInfo = { ...movieInfo }
    updatedMovieInfo.genre = JSON.stringify(genre)
    updatedMovieInfo.tags = JSON.stringify(tags)
    if (director) updatedMovieInfo.director = director._id || director.actorId
    if (writers.length) {
      const finalWriters = writers.map(writer => writer._id || writer.actorId)
      updatedMovieInfo.writers = JSON.stringify(finalWriters)
    }

    if (cast?.length) {
      const finalCast = cast.map(c => {
        return {
          actor: c.actor?._id,
          roleAs: c.roleAs,
          leadActor: c.leadActor,
        }
      })

      updatedMovieInfo.cast = JSON.stringify(finalCast)
    }

    if (movieInfo.trailer || trailer) updatedMovieInfo.trailer = JSON.stringify(trailer || movieInfo.trailer)
    if (poster?.url) updatedMovieInfo.poster = JSON.stringify(poster)

    for (let key in updatedMovieInfo) {
      // console.log(key, updatedMovieInfo[key])
      formData.append(key, updatedMovieInfo[key])
    }

    if (selectedMovie) {
      const { data, err } = await updateMovie(selectedMovie._id, formData)
      setUploading(false)
      if (err) return renderNotification('error', err)
      if (data) renderNotification('success', 'Movie updated successfully')
      return closeModal()
      // return toggleVideoStates()
    }

    const { data, err } = await postMovie(formData)
    setUploading(false)

    if (err) return renderNotification('error', err)
    if (data) renderNotification('success', 'Movie created successfully')
    closeModal()
    toggleVideoStates()
  }

  useEffect(() => {
    if (selectedMovie) {
      setMovieInfo({ ...selectedMovie })
      setSelectedPoster(selectedMovie.poster.url)
    }
  }, [selectedMovie])

  console.log(writers)

  return (
    <form
      className='grid grid-cols-[70%,30%] p-2 px-6 gap-4 relative min-h-full place-content-center'
      onSubmit={handleSubmit}
    >
      <WritersModal
        visible={writersModal && movieInfo.writers?.length > 0}
        closeModal={toggleWritersModal}
        writers={writers}
        handleDeleteWriter={handleDeleteWriter}
      />

      <GenreModal visible={showGenresModal} closeModal={toggleGenresModal} updateGenres={updateGenres} genre={genre} />

      {/* left side */}
      <div className='space-y-4'>
        <div className='flex flex-col-reverse'>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={handleOnChange}
            placeholder='interstellar'
            className='bg-transparent capitalize outline-none border-b-[#aaa] dark:border-b-[#aaa] border-b-[1px] text-white focus:border-b-black dark:focus:border-b-white peer'
          />
          <label
            htmlFor='title'
            className='text-[#aaa] capitalize text-sm cursor-pointer peer-focus:text-black dark:peer-focus:text-white self-start'
          >
            title
          </label>
        </div>

        <div className='flex flex-col-reverse'>
          <textarea
            id='storyLine'
            name='storyLine'
            value={storyLine}
            onChange={handleOnChange}
            placeholder='movie story line...'
            className='capitalize h-20 bg-transparent outline-none border-b-[#aaa] dark:border-b-[#aaa] border-b-[1px] text-white focus:border-b-black dark:focus:border-b-white peer resize-none'
          ></textarea>
          <label
            htmlFor='storyLine'
            className='text-[#aaa] capitalize text-sm cursor-pointer peer-focus:text-black dark:peer-focus:text-white self-start'
          >
            Storyline
          </label>
        </div>

        <Tags updateTags={updateTags} tags={tags} />

        <div className='flex flex-col-reverse relative'>
          {/* <label htmlFor='director'>director</label> */}
          <LiveSearch2 name='director' onClick={updateDirector} value={director?.name} />
          <label
            htmlFor='director'
            className='text-[#aaa] capitalize text-sm cursor-pointer peer-focus:text-black dark:peer-focus:text-white self-start relative'
          >
            director
          </label>
        </div>

        <LiveSearch2 name='writers' onClick={updateWriters} value={writers?.name} />
        {/* 
        <CastForm
          onClick={updateCast}
          cast={movieInfo.cast}
          toggleWritersModal={toggleWritersModal}
          modal={writersModal}
          deleteCast={handleDeleteCast}
        /> */}

        {/* <div className='flex flex-col-reverse'>
          <input
            type='date'
            id='releaseDate'
            name='releaseDate'
            value={movieInfo.releaseDate.split('T')[0]}
            onChange={handleOnChange}
            className='px-1 self-start cursor-pointer bg-transparent outline-none border-[#aaa] dark:border-[#aaa] border-[1px] rounded text-white focus:border-black dark:focus:border-white peer'
          />
          <label
            htmlFor='releaseDate'
            className='text-[#aaa] capitalize text-sm cursor-pointer peer-focus:text-black dark:peer-focus:text-white self-start'
          >
            release date
          </label>
        </div> */}
      </div>
      {/* Right side */}
      <div className='space-y-4'>
        <PosterUploader onChange={handleOnChange} selectedPoster={selectedPoster} className='h-56' />
        <Geners openModal={toggleGenresModal} genre={movieInfo.genre} />
        <Select label='type' name='type' options={typeOptions} value={movieInfo.type} onChange={handleOnChange} />
        <Select
          label='language'
          name='language'
          options={languageOptions}
          value={movieInfo.language}
          onChange={handleOnChange}
        />
        <Select
          label='status'
          name='status'
          options={statusOptions}
          value={movieInfo.status}
          onChange={handleOnChange}
        />
      </div>
      <button className='dark:bg-white rounded h-8 flex justify-center items-center'>
        {uploading ? <ImSpinner2 className='animate-spin' /> : 'Upload Movie'}
      </button>
    </form>
  )
}

export default MovieForm
