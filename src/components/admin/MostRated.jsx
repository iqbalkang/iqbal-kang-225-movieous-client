import React, { useState, useEffect } from 'react'
import Rating from '../Rating'
import { getMostRated } from '../../apis/admin'
import Box from './Box'

const MostRated = () => {
  const [mostRated, setMostRated] = useState([])

  const fetchMostRated = async () => {
    const { data, error } = await getMostRated()
    setMostRated(data.movies)
  }

  useEffect(() => {
    fetchMostRated()
  }, [])

  const renderMostRated = mostRated.map(movie => <MostRatedMovie key={movie.id} {...movie} />)

  return (
    <Box>
      <h2 className='text-lg font-bold capitalize mb-4'>most rated movies</h2>
      <div className='space-y-4'>{renderMostRated}</div>
    </Box>
  )
}

export default MostRated

const MostRatedMovie = ({ title, reviews: { ratingAvg, reviewCount } }) => {
  return (
    <div>
      <h3 className='capitalize'>{title}</h3>
      <Rating ratingAvg={ratingAvg} reviewCount={reviewCount} />
    </div>
  )
}
