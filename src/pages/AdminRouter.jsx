import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminHome from './AdminHome'
import Movies from './Movies'
import Actors from './Actors'

const AdminRouter = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [])

  return (
    <div className='dark:bg-body bg-white text-[#555] dark:text-[#ddd] min-h-screen'>
      <Routes>
        <Route path='/' element={<AdminHome />}>
          <Route path='movies' element={<Movies />} />
          <Route path='actors' element={<Actors />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRouter
