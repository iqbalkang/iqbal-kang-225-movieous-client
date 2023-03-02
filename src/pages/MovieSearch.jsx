import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovie } from '../apis/movie'
import Movie from '../components/Movie'
import useNotification from '../hooks/useNotification'

const MovieSearch = () => {
  const { renderNotification } = useNotification()

  const [searchParams] = useSearchParams()
  const title = searchParams.get('title')

  const [searchedMovies, setSearchedMovies] = useState([])

  const fetchSearchedMovies = async () => {
    const { data, error } = await searchMovie(title)
    if (!data.movies.length) return renderNotification('warning', 'No record was found')
    setSearchedMovies(data.movies)
  }
  useEffect(() => {
    fetchSearchedMovies()
  }, [title])

  const renderMovies = () => searchedMovies.map(movie => <Movie key={movie._id} movie={movie} />)

  return <div className='divide-black dark:divide-white divide-y-2'>{renderMovies()}</div>
}

export default MovieSearch
