import React, { useState, useEffect } from 'react'
import Tags from './Tags'
import CastForm from './CastForm'
import PosterUploader from './PosterUploader'
import Geners from './Geners'
import GenreModal from './modals/GenreModal'
import Select from './Select'
import { languageOptions, statusOptions, typeOptions } from '../utils/options'
import useNotification from '../hooks/useNotification'
import { postMovie, updateMovie } from '../apis/movie'
import validateMovie from '../utils/validateMovie'

import WritersModal from './modals/WritersModal'
import LiveSearch from './LiveSearch'
import LiveSearchLabel from './LiveSearchLabel'
import LiveSearchButton from './LiveSearchButton'
import useConfirm from '../hooks/useConfirm'
import SubmitButton from './SubmitButton'
import Input from './Input'
import Label from './Label'
import ConfirmModal from './modals/ConfirmModal'
import useMovies from '../hooks/useMovies'

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

const formRowStyles = 'flex flex-col-reverse '
const inputStyles =
  'bg-transparent capitalize outline-none border-b-grayish dark:border-b-grayish border-b-[1px] toggle-text focus:border-b-black dark:focus:border-b-white peer '

const MovieForm = ({ trailer, videoSelected, selectedMovie, toggleVideoStates }) => {
  const { renderNotification } = useNotification()
  const { confirmModal, closeConfirmModal, forceCloseModals, toggleFillingForm } = useConfirm()
  const { fetchMovies, fetchLatestMovies } = useMovies()

  const [movieInfo, setMovieInfo] = useState(defaultMovieInfo)
  const [writersModal, setWritersModal] = useState(false)
  const [selectedPoster, setSelectedPoster] = useState('')
  const [genresModal, setGenresModal] = useState(false)
  const [uploading, setUploading] = useState(false)

  const { title, storyLine, director, writers, genre, tags, cast, releaseDate, type, language, status } = movieInfo

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

  const updateCast = selectedcast => {
    for (let member of cast) {
      if (member.actor.actorId === selectedcast.actor.actorId) return null
    }
    setMovieInfo({ ...movieInfo, cast: [...cast, selectedcast] })
  }

  const updateGenres = genres => {
    setMovieInfo({ ...movieInfo, genre: genres })
  }

  const toggleWritersModal = () => setWritersModal(prevState => !prevState)
  const toggleGenresModal = () => setGenresModal(prevState => !prevState)

  const handleDeleteWriter = writer => {
    const remainingWriters = writers.filter(singleWriter => singleWriter.name !== writer.name)
    setMovieInfo({ ...movieInfo, writers: remainingWriters })
    if (!remainingWriters.length) setWritersModal(false)
  }

  const handleDeleteCast = castIndex => {
    const remainingCast = cast.filter((_, index) => index !== castIndex)
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
          actor: c.actor?.actorId,
          roleAs: c.roleAs,
          leadActor: c.leadActor,
        }
      })

      updatedMovieInfo.cast = JSON.stringify(finalCast)
    }

    if (movieInfo.trailer || trailer) updatedMovieInfo.trailer = JSON.stringify(trailer || movieInfo.trailer)
    if (poster?.url) updatedMovieInfo.poster = JSON.stringify(poster)

    for (let key in updatedMovieInfo) {
      formData.append(key, updatedMovieInfo[key])
    }

    if (selectedMovie) {
      const { data, error: err } = await updateMovie(selectedMovie.id, formData)
      setUploading(false)
      console.log(err)
      if (err) return renderNotification('error', err)
      if (data) renderNotification('success', 'Movie updated successfully')
      await fetchMovies()
      await fetchLatestMovies(4)
      return forceCloseModals()
    }

    const { data, err } = await postMovie(formData)
    setUploading(false)

    if (err) return renderNotification('error', err)
    if (data) renderNotification('success', 'Movie created successfully')
    await fetchMovies()
    await fetchLatestMovies(4)
    forceCloseModals()
    toggleVideoStates()
  }

  useEffect(() => {
    if (selectedMovie) {
      setMovieInfo({ ...selectedMovie })
      setSelectedPoster(selectedMovie.poster.url)
    }
  }, [selectedMovie])

  useEffect(() => {
    for (let key in movieInfo) {
      if ((typeof movieInfo[key] === 'string' && movieInfo[key] !== '') || videoSelected) return toggleFillingForm()
      if ((typeof movieInfo[key] === 'object' && movieInfo[key]?.length >= 1) || videoSelected)
        return toggleFillingForm()
    }
  }, [movieInfo])

  const superForce = () => {
    if (toggleVideoStates) toggleVideoStates()
    forceCloseModals()
  }

  // console.log(movieInfo.cast)

  return (
    <form
      className='grid grid-cols-[70%,30%] p-2 px-6 gap-4 relative min-h-full place-content-center'
      onSubmit={handleSubmit}
    >
      <WritersModal
        visible={writersModal && writers?.length > 0}
        closeModal={toggleWritersModal}
        writers={writers}
        handleDeleteWriter={handleDeleteWriter}
      />

      <GenreModal visible={genresModal} closeModal={toggleGenresModal} updateGenres={updateGenres} genre={genre} />

      <ConfirmModal
        visible={confirmModal}
        closeModal={closeConfirmModal}
        forceCloseModals={superForce}
        text='this action will cancel uploading movie.'
      />

      {/* left side */}
      <div className='space-y-4'>
        <div className={formRowStyles}>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={handleOnChange}
            placeholder='interstellar'
            className={inputStyles}
          />
          <Label htmlFor='title'> title </Label>
        </div>

        <div className={formRowStyles}>
          <textarea
            id='storyLine'
            name='storyLine'
            value={storyLine}
            onChange={handleOnChange}
            placeholder='movie story line...'
            className={inputStyles + 'h-20 resize-none'}
          ></textarea>
          <Label htmlFor='storyLine'> storyline </Label>
        </div>

        <Tags updateTags={updateTags} tags={tags} />

        <div className={formRowStyles + 'relative'}>
          <LiveSearch name='director' onClick={updateDirector} value={director?.name} />
          <LiveSearchLabel name='director' />
        </div>

        <div className={formRowStyles + 'relative'}>
          <LiveSearch name='writers' onClick={updateWriters} value={writers?.name} />
          <LiveSearchLabel name='writers' badge={true} count={writers.length} />
          <LiveSearchButton active={writers.length} onClick={toggleWritersModal} />
        </div>

        <CastForm
          onClick={updateCast}
          cast={cast}
          toggleWritersModal={toggleWritersModal}
          modal={writersModal}
          deleteCast={handleDeleteCast}
        />

        <div className={formRowStyles}>
          <Input
            className='py-0 md:w-fit cursor-pointer text-white'
            type='date'
            id='releaseDate'
            name='releaseDate'
            value={releaseDate.split('T')[0]}
            onChange={handleOnChange}
          />
          <Label htmlFor='releaseDate'> release date </Label>
        </div>
      </div>
      {/* Right side */}
      <div className='space-y-4'>
        <PosterUploader onChange={handleOnChange} selectedPoster={selectedPoster} className='' />
        <Geners openModal={toggleGenresModal} genre={movieInfo.genre} />
        <Select label='type' name='type' options={typeOptions} value={type} onChange={handleOnChange} />
        <Select label='language' name='language' options={languageOptions} value={language} onChange={handleOnChange} />
        <Select label='status' name='status' options={statusOptions} value={status} onChange={handleOnChange} />
      </div>

      <SubmitButton text='upload movie' uploading={uploading} />
    </form>
  )
}

export default MovieForm
