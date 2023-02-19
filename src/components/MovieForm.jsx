import React, { useState } from 'react'
import Tags from './Tags'
import { results } from '../utils/fakeData'
import LiveSearch from './LiveSearch'
import InnerModal from './InnerModal'

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

  const handleOnChange = e => {
    const { name, value } = e.target
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

  const toggleWritersModal = () => setWritersModal(prevState => !prevState)

  console.log(movieInfo)

  return (
    <form className='grid grid-cols-[70%,30%] p-2 relative min-h-full'>
      {writersModal && <InnerModal closeModal={toggleWritersModal}>sds</InnerModal>}
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
      </div>
      <div></div>
    </form>
  )
}

export default MovieForm
