import React, { useContext } from 'react'
import { MovieContext } from '../context/MoviesProvider'

const useMovies = () => useContext(MovieContext)

export default useMovies
