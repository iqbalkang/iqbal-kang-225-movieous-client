import React, { useState } from 'react'
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

const defaultMovieInfo = {
  title: '',
  storyLine: '',
  tags: [],
  director: {},
  writers: [],
  cast: [],
  releaseDate: '',
  status: '',
  type: '',
  language: '',
  genre: [],
  poster: {},
  trailerInfo: {},
}

const MovieForm = () => {
  const [movieInfo, setMovieInfo] = useState(defaultMovieInfo)
  const [writersModal, setWritersModal] = useState(false)
  const [selectedPoster, setSelectedPoster] = useState('')
  const [showGenresModal, setShowGenresModal] = useState(false)

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
      if (member.actor.id === cast.actor.id) return null
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

  const renderWriters = () => {
    return movieInfo.writers.map((writer, index) => {
      const { avatar, name } = writer
      return (
        <div className='flex items-center gap-8 justify-between' key={index}>
          <div className='flex items-center gap-2'>
            <img src={avatar} alt='' className='h-12 w-12 bg-red-400 object-cover rounded-full' />
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

  console.log(movieInfo)

  return (
    <>
      <div className='fixed rounded bg-white dark:bg-modal w-[40rem] h-[35rem] shadow-md cursor-auto overflow-y-scroll'>
        <form className='grid grid-cols-[70%,30%] p-2 px-6 gap-4 relative min-h-full place-content-center'>
          {writersModal && movieInfo.writers.length > 0 && (
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

            <Tags updateTags={updateTags} />

            <LiveSearch onClick={updateDirector} placeholder='search profile' results={results} name='director' />
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
                value={movieInfo.releaseDate}
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
            <PosterUploader onChange={handleOnChange} selectedPoster={selectedPoster} />
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
        </form>
      </div>

      {showGenresModal && (
        <GenreModal closeModal={toggleGenresModal} updateGenres={updateGenres} genre={movieInfo.genre} />
      )}
    </>
  )
}

export default MovieForm
