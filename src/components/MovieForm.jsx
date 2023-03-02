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
import GenreModal from './GenreModal'
import Select from './Select'
import options, { languageOptions, statusOptions, typeOptions } from '../utils/options'
import useNotification from '../hooks/useNotification'
import { postMovie, updateMovie } from '../apis/movie'
import validateMovie from '../utils/validateMovie'
import { ImSpinner2 } from 'react-icons/im'

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

const MovieForm = ({ visible, trailer, closeModal, selectedMovie, toggleVideoStates }) => {
  const { renderNotification } = useNotification()

  const [movieInfo, setMovieInfo] = useState(defaultMovieInfo)
  const [writersModal, setWritersModal] = useState(false)
  const [selectedPoster, setSelectedPoster] = useState('')
  const [showGenresModal, setShowGenresModal] = useState(false)
  const [uploading, setUploading] = useState(false)

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

  const updateWriters = writer => {
    if (movieInfo.writers.includes(writer)) return null
    setMovieInfo({ ...movieInfo, writers: [...movieInfo.writers, writer] })
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

    console.log(movieInfo.trailer)
    if (movieInfo.trailer || trailer) updatedMovieInfo.trailer = JSON.stringify(trailer || movieInfo.trailer)
    if (poster?.url) updatedMovieInfo.poster = JSON.stringify(poster)

    for (let key in updatedMovieInfo) {
      console.log(key, updatedMovieInfo[key])
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

  console.log(movieInfo)

  const renderWriters = () => {
    return movieInfo.writers.map((writer, index) => {
      const { image, name } = writer
      return (
        <div className='flex items-center gap-8 justify-between' key={index}>
          <div className='flex items-center gap-2'>
            <img src={image.url} alt='' className='h-12 w-12 object-cover rounded-full' />
            <p className='capitalize whitespace-nowrap'>{name}</p>
          </div>
          <IoMdClose
            className='cursor-pointer hover:text-custom-yellow'
            onClick={handleDeleteWriter.bind(null, writer)}
          />
        </div>
      )
    })
  }

  if (!visible) return null

  return (
    <>
      <form
        className='grid grid-cols-[70%,30%] p-2 px-6 gap-4 relative min-h-full place-content-center'
        onSubmit={handleSubmit}
      >
        {writersModal && movieInfo.writers?.length > 0 && (
          <InnerModal closeModal={toggleWritersModal}>
            <div className='space-y-4'>{renderWriters()}</div>
          </InnerModal>
        )}
        <div className='space-y-4'>
          <div className='flex flex-col-reverse'>
            <input
              type='text'
              id='title'
              name='title'
              value={movieInfo.title}
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
              value={movieInfo.storyLine}
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

          <Tags updateTags={updateTags} selectedTags={movieInfo.tags} />

          <LiveSearch
            onClick={updateDirector}
            placeholder='search profile'
            results={results}
            name='director'
            val={movieInfo.director?.name}
          />
          <LiveSearch
            onClick={updateWriters}
            placeholder='search profile'
            results={results}
            name='writers'
            writers={movieInfo.writers}
            toggleWritersModal={toggleWritersModal}
          />
          <CastForm
            onClick={updateCast}
            cast={movieInfo.cast}
            toggleWritersModal={toggleWritersModal}
            modal={writersModal}
            deleteCast={handleDeleteCast}
          />

          <div className='flex flex-col-reverse'>
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
          </div>
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

      {showGenresModal && (
        <GenreModal closeModal={toggleGenresModal} updateGenres={updateGenres} genre={movieInfo.genre} />
      )}
    </>
  )
}

export default MovieForm
