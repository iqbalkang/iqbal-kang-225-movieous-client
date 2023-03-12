import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Movie = ({ id, title, poster, responsivePosters, reviews: { ratingAvg, reviewCount } }) => {
  const renderImage = responsivePosters ? responsivePosters[0] : poster
  return (
    <Link to={`/movie/${id}`}>
      <img src={renderImage} alt='' className='object-cover mb-2 rounded' />
      <h3 className='capitalize'>{title}</h3>
      <div className='flex items-center gap-1 text-accent dark:text-custom-yellow text-sm capitalize'>
        {ratingAvg ? (
          <>
            <AiFillStar />
            <span>{ratingAvg}</span>
            <span className='text-grayish'>
              ({reviewCount} {reviewCount > 1 ? ' reviews' : ' review'})
            </span>
          </>
        ) : (
          'no reviews'
        )}
      </div>
    </Link>
  )
}

export default Movie
