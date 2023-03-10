import React, { useState, useEffect } from 'react'
import { getTopRated } from '../../apis/movie'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

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

const Movie = ({ id, title, poster, reviews: { ratingAvg } }) => {
  // console.log
  return (
    <Link to={id}>
      <img src={poster} alt='' className='aspect-square mb-2 rounded' />
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
