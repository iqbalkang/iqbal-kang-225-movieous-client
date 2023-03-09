import React, { useState, createContext } from 'react'
import { getMovies } from '../apis/movie'

export const MovieContext = createContext()

const limit = 5

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [recentUploads, setRecentUploads] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const handleNext = () => setCurrentPage(currentPage + 1)

  const handlePrev = () => {
    if (currentPage < 1) return
    setCurrentPage(currentPage - 1)
  }

  const fetchMovies = async () => {
    const { data, error } = await getMovies(currentPage, limit)
    // console.log(data)
    if (!data.movies.length) return setCurrentPage(currentPage - 1)
    setMovies(data.movies)
  }

  const fetchLatestMovies = async numberOfMovies => {
    const { data, error } = await getMovies(0, numberOfMovies)
    // console.log(data)
    setRecentUploads(data.movies)
  }

  return (
    <MovieContext.Provider
      value={{ fetchMovies, currentPage, movies, handleNext, handlePrev, fetchLatestMovies, recentUploads }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MoviesProvider
