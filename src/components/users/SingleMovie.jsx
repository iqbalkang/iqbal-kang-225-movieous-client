import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSingleMovie } from '../../apis/movie'
import ActorProfileModal from '../modals/ActorProfileModal'
import RatingModal from '../modals/RatingModal'
import RelatedMovies from './RelatedMovies'
import useAuth from '../../hooks/useAuth'
import { getOwnerReview } from '../../apis/review'
import { AiFillStar } from 'react-icons/ai'
import CustomButton from './CustomButton'
import { formattName } from '../../utils/formatName'

const SingleMovie = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const { authInfo } = useAuth()

  const [movie, setMovie] = useState(null)
  const [selectedProfileId, setSelectedProfileId] = useState(null)
  const [profileModal, setProfileModal] = useState(false)
  const [ratingModal, setRatingModal] = useState(false)
  const [ownerReview, setOwnerReview] = useState(null)

  // console.log(ownerReview)

  const { user } = authInfo

  const fetchSingleMovie = async () => {
    const { data, error } = await getSingleMovie(movieId)
    setMovie(data.movie)
  }

  const fetchOwnerReview = async () => {
    const { data, error } = await getOwnerReview(movieId)
    setOwnerReview(data?.review)
  }
  const updateRating = (reviews, ownerReview) => {
    setMovie({ ...movie, reviews })
    fetchOwnerReview()
    setOwnerReview(ownerReview)
  }

  useEffect(() => {
    fetchSingleMovie()
    if (user) fetchOwnerReview()
  }, [movieId, user])

  if (!movie) return <p className='text-center animate-pulse'>please wait...</p>

  const toggleProfileModal = () => setProfileModal(prevState => !prevState)
  const toggleRatingModal = () => setRatingModal(prevState => !prevState)

  const handleReviewButtonClick = () => {
    if (!user) return navigate('/login', { state: `/movie/${movieId}` })
    toggleRatingModal()
  }

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
        <div className='flex justify-between py-2'>
          <h3 className=' text-lg md:text-2xl font-semibold capitalize text-accent dark:text-custom-yellow'>{title}</h3>

          <div className='flex gap-2 text-xs'>
            <TotalRating reviews={movie.reviews} movieId={movieId} title={movie.title} />
            <OwnerRating onClick={handleReviewButtonClick} ownerReview={ownerReview} />
            {/* <button onClick={handleReviewButtonClick}>rate this movie</button> */}
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
          <div className='flex gap-6 md:gap-2 flex-wrap justify-center md:justify-start'>{renderTopCast}</div>
        </div>

        <ActorProfileModal visible={profileModal} closeModal={toggleProfileModal} selectedProfile={selectedProfileId} />
        <RatingModal
          visible={ratingModal}
          closeModal={toggleRatingModal}
          movieId={movieId}
          onSubmit={updateRating}
          initialState={ownerReview}
        />
      </div>

      <RelatedMovies movieId={movieId} />
    </section>
  )
}

export default SingleMovie

const TotalRating = ({ reviews, movieId, title }) => {
  const { ratingAvg, reviewCount } = reviews
  return (
    <Link to={`/movie/reviews/${movieId}?title=${title}`} className='flex flex-col items-center'>
      <h2 className='text-blackish dark:text-grayish capitalize'>total rating</h2>
      <button className='flex hover:bg-offwhite dark:hover:bg-blackish px-2 rounded'>
        <AiFillStar size={24} className='text-custom-yellow' />
        <div>
          <p>
            <span className='text-xl toggle-text'>{ratingAvg || 0}</span>/10
          </p>
          <p className='flex gap-1'>
            <span className='toggle-text font-semibold'>{reviewCount || 0}</span>
            {reviewCount > 1 ? ' reviews' : ' review'}
          </p>
        </div>
      </button>
    </Link>
  )
}

const OwnerRating = ({ onClick, ownerReview }) => {
  const renderSpanText = () => {
    if (!ownerReview) return <span className='text-[#E06C9F] text-lg font-semibold'>Rate</span>
    else
      return (
        <>
          <span className='text-xl toggle-text'>{ownerReview.rating}</span>
          <span>/10</span>
        </>
      )
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-blackish dark:text-grayish capitalize'>your rating</h2>
      <button onClick={onClick} className='flex hover:bg-offwhite dark:hover:bg-blackish px-2 rounded'>
        <AiFillStar size={24} className='text-[#E06C9F]' />
        <div>
          <p>{renderSpanText()}</p>
        </div>
      </button>
    </div>
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
        title={name}
      >
        {formattName(name)}
      </button>
      <p className='capitalize text-sm'>{roleAs}</p>
    </div>
  )
}
