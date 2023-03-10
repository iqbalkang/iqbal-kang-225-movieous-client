import React from 'react'
import Slider from '../components/users/Slider'
import MovieList from '../components/users/MovieList'

const Dashboard = () => {
  return (
    <div className='space-y-8 py-4'>
      <Slider />
      <MovieList />
      <MovieList type='Web Series' />
    </div>
  )
}

export default Dashboard
