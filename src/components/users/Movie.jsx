import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Movie = ({ id, title, poster, responsivePosters, reviews: { ratingAvg } }) => {
  const renderImage = responsivePosters ? responsivePosters[0] : poster
  return (
    <Link to={`/movie/${id}`}>
      <img src={renderImage} alt='' className='object-cover mb-2 rounded' />
      <h3 className='capitalize'>{title}</h3>
      <div className='flex items-center gap-1 text-accent dark:text-custom-yellow text-sm capitalize'>
        {ratingAvg ? (
          <>
            <span>7.5</span>
            <AiFillStar />
          </>
        ) : (
          'no reviews'
        )}
      </div>
    </Link>
  )
}

export default Movie
