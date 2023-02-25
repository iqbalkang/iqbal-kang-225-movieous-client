import React, { useState, useEffect } from 'react'

import Movie from '../../components/Movie'
import Box from './Box'
import { getMovies } from '../../apis/movie'

const RecentUploads = () => {
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    const { data, error } = await getMovies(0, 2)
    setMovies(data.movies)
  }

  const renderMovies = () => movies.map(movie => <Movie key={movie._id} movie={movie} />)

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <Box className='col-span-2'>
      <h1 className='text-lg font-bold capitalize'>recent uploads</h1>

      <div className='divide-black dark:divide-white divide-y-2'>{renderMovies()}</div>
    </Box>
  )
}

export default RecentUploads
