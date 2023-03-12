import React, { useState, useEffect } from 'react'
import { getTopRated } from '../../apis/movie'
import Movie from './Movie'

const MovieList = ({ type }) => {
  const [results, setResults] = useState([])

  const fetchTopRatedMovies = async type => {
    const { data, error } = await getTopRated(type)
    setResults(data.movies)
  }

  useEffect(() => {
    fetchTopRatedMovies(type)
  }, [])

  const renderMoviesList = results.map(result => <Movie key={result.id} {...result} />)

  return (
    <div>
      <h2 className='font-bold text-xl capitalize mb-2'>top rated - {type ? type : 'Movies'}</h2>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 gap-y-6'>{renderMoviesList}</div>
    </div>
  )
}

export default MovieList
