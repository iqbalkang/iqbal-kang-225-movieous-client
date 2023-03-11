import React, { useState, useEffect } from 'react'
import { getRelatedMovies } from '../../apis/movie'
import Movie from './Movie'

const RelatedMovies = ({ movieId }) => {
  const [relatedMovies, setRelatedMovies] = useState([])

  const fetchRelatedMovies = async () => {
    const { data, error } = await getRelatedMovies(movieId)
    setRelatedMovies(data.movies)
  }

  useEffect(() => {
    fetchRelatedMovies()
  }, [movieId])

  const renderRelatedMovies = relatedMovies.map(movie => <Movie key={movie.id} {...movie} />)

  return (
    <div>
      <h2 className='text-xl dark:text-white mb-1'>More like this</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2'>{renderRelatedMovies}</div>
    </div>
  )
}

export default RelatedMovies
