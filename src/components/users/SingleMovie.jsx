import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleMovie } from '../../apis/movie'
import ActorProfileModal from '../modals/ActorProfileModal'
import RatingModal from '../modals/RatingModal'
import RelatedMovies from './RelatedMovies'

const SingleMovie = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [selectedProfileId, setSelectedProfileId] = useState(null)
  const [profileModal, setProfileModal] = useState(false)
  const [ratingModal, setRatingModal] = useState(true)

  const fetchSingleMovie = async () => {
    const { data, error } = await getSingleMovie(movieId)
    setMovie(data.movie)
  }

  useEffect(() => {
    fetchSingleMovie()
  }, [movieId])

  if (!movie) return <p className='text-center animate-pulse'>please wait...</p>

  const toggleProfileModal = () => setProfileModal(prevState => !prevState)
  const toggleRatingModal = () => setRatingModal(prevState => !prevState)

  const handleProfileClick = id => {
    toggleProfileModal()
    setSelectedProfileId(id)
  }

  const {
    trailer,
    poster,
    title,
    storyLine,
    rating,
    cast,
    director,
    writers,
    genre,
    language,
    releaseDate,
    status,
    type,
  } = movie

  const renderWriters = writers.map(writer => (
    <CustomButton key={writer.id} onClick={handleProfileClick.bind(null, writer.id)}>
      {writer.name}
    </CustomButton>
  ))

  const renderGenres = genre.map(genre => (
    <CustomButton key={genre} notButton={true}>
      {genre}
    </CustomButton>
  ))

  const renderLeadCast = cast.map(member => {
    if (member.leadActor)
      return (
        <CustomButton key={member.id} onClick={handleProfileClick.bind(null, member.profile.id)}>
          {member.profile.name}
        </CustomButton>
      )
  })

  const renderReleaseDate = releaseDate.split('T')[0]

  const renderTopCast = cast.map(member => (
    <TopCast key={member.id} {...member} handleProfileClick={handleProfileClick} />
  ))

  return (
    <section className='grid lg:grid-cols-[4fr,1fr] gap-2 py-4'>
      <div className=' text-blackish dark:text-grayish'>
        <video poster={poster} controls src={trailer}></video>
        <div className='flex justify-between items-center text-accent dark:text-custom-yellow '>
          <h3 className='text-2xl font-semibold capitalize'>{title}</h3>

          <div className='flex flex-col items-end text-xs'>
            <p>no reviews</p>
            <Link>0 reviews</Link>
            <button>rate this movie</button>
          </div>
        </div>
        <p>{storyLine}</p>

        <div className='space-y-2 mt-2'>
          <Info label='director'>
            <CustomButton onClick={handleProfileClick.bind(null, director.id)}>{director.name}</CustomButton>
          </Info>

          <Info label='writers'>{renderWriters}</Info>
          <Info label='lead actors'>{renderLeadCast}</Info>
          <Info label='genres'>{renderGenres}</Info>
          <Info label='language'>
            <CustomButton notButton={true}>{language}</CustomButton>
          </Info>
          <Info label='release date'>
            <CustomButton notButton={true}>{renderReleaseDate}</CustomButton>
          </Info>
          <Info label='type'>
            <CustomButton notButton={true}>{type}</CustomButton>
          </Info>
        </div>

        <div className='my-4'>
          <h2 className='text-2xl font-bold dark:text-white mb-1'>Top cast</h2>
          <div className='flex gap-2 flex-wrap'>{renderTopCast}</div>
        </div>

        <ActorProfileModal visible={profileModal} closeModal={toggleProfileModal} selectedProfile={selectedProfileId} />
        <RatingModal visible={ratingModal} closeModal={toggleRatingModal} />
      </div>

      <RelatedMovies movieId={movieId} />
    </section>
  )
}

export default SingleMovie

const CustomButton = ({ children, onClick, notButton = false }) => {
  const commonClasses = `text-accent dark:text-custom-yellow capitalize `
  if (notButton) return <p className={commonClasses}>{children}</p>
  return (
    <button className={commonClasses + 'hover:underline'} onClick={onClick}>
      {children}
    </button>
  )
}

const Info = ({ label, children }) => {
  return (
    <div className='flex gap-2'>
      <p className='capitalize'>{label}:</p>
      {children}
    </div>
  )
}

const TopCast = ({ roleAs, profile, handleProfileClick }) => {
  const { name, image, id } = profile
  return (
    <div className='flex flex-col items-center'>
      <img
        src={image}
        alt={name}
        className='h-28 w-28 rounded-full object-cover cursor-pointer'
        onClick={handleProfileClick.bind(null, id)}
      />
      <button
        className='text-black dark:text-white capitalize hover:underline'
        onClick={handleProfileClick.bind(null, id)}
      >
        {name}
      </button>
      <p className='capitalize text-sm'>{roleAs}</p>
    </div>
  )
}
