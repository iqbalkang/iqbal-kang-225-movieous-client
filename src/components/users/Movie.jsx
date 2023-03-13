import React from 'react'

import { Link } from 'react-router-dom'
import Rating from '../Rating'

const Movie = ({ id, title, poster, responsivePosters, reviews: { ratingAvg, reviewCount } }) => {
  const renderImage = responsivePosters ? responsivePosters[0] : poster
  return (
    <Link to={`/movie/${id}`}>
      <img src={renderImage} alt='' className='object-cover mb-2 rounded' />
      <h3 className='capitalize'>{title}</h3>
      <Rating reviewCount={reviewCount} ratingAvg={ratingAvg} />
    </Link>
  )
}

export default Movie
