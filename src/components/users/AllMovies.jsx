import React, { useState, useEffect } from 'react'
import { getAllMovies, getUserMovies } from '../../apis/movie'
import useMovies from '../../hooks/useMovies'
import Pagination from '../Pagination'
import Movie from './Movie'

const limit = 12

const AllMovies = ({}) => {
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const handleNext = () => setCurrentPage(currentPage + 1)

  const handlePrev = () => {
    if (currentPage < 1) return
    setCurrentPage(currentPage - 1)
  }

  const fetchAllMovies = async () => {
    const { data, error } = await getAllMovies(currentPage, limit)

    if (!data.movies.length) return setCurrentPage(currentPage - 1)
    setResults(data.movies)
  }

  useEffect(() => {
    fetchAllMovies()
  }, [currentPage])

  const renderMoviesList = results.map(result => <Movie key={result.id} {...result} />)

  return (
    <div className='h-full flex-1 py-4'>
      <h2 className='font-bold text-xl capitalize mb-2'>all movies</h2>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-6'>{renderMoviesList}</div>
      <div className='flex justify-end'>
        <Pagination handlePrev={handlePrev} handleNext={handleNext} />
      </div>
    </div>
  )
}

export default AllMovies
