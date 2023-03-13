import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovieUser } from '../apis/movie'
import Movie from '../components/users/Movie'
// import { searchMovie } from '../apis/movie'
// import Movie from '../components/Movie'
import useNotification from '../hooks/useNotification'

const UserMovieSearch = () => {
  const { renderNotification } = useNotification()

  const [searchParams] = useSearchParams()
  const title = searchParams.get('title')

  const [searchedMovies, setSearchedMovies] = useState([])

  const fetchSearchedMovies = async () => {
    const { data, error } = await searchMovieUser(title)
    console.log(data)
    if (!data.movies.length) return renderNotification('warning', 'No record was found')
    setSearchedMovies(data.movies)
  }

  useEffect(() => {
    fetchSearchedMovies()
  }, [title])

  const renderMovies = () => searchedMovies.map(movie => <Movie key={movie.id} {...movie} />)

  return (
    <div className='h-full flex-1 py-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-4'>
      {renderMovies()}
    </div>
  )
}

export default UserMovieSearch
