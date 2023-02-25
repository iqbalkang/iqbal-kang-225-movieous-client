import React, { useState, useEffect } from 'react'
import { getMovies } from '../apis/movie'
import Movie from '../components/Movie'

const Movies = () => {
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    const { data, error } = await getMovies(0, 2)
    setMovies(data.movies)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const renderMovies = () => movies.map(movie => <Movie key={movie._id} movie={movie} />)

  return <div>{renderMovies()}</div>
}

export default Movies
