import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthNav from '../components/AuthNav'
import AuthHeader from '../components/AuthHeader'

const AdminHome = () => {
  return (
    <div className='grid grid-cols-[200px,1fr]'>
      <AuthNav />

      <div className='p-6'>
        <AuthHeader />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminHome
