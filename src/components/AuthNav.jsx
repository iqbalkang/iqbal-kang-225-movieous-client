import React, { useEffect } from 'react'
import { GoHome } from 'react-icons/go'
import { MdOutlineLocalMovies } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import logoDark from '../images/logo-dark.png'
import { AiOutlineLogout, AiOutlineUsergroupAdd } from 'react-icons/ai'
import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'

const AuthNav = () => {
  const navigate = useNavigate()
  const { authInfo, logout } = useAuth()
  const { darkMode } = useTheme()
  const { user } = authInfo

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // useEffect(() => {
  //   if (!user) navigate('/login')
  // }, user)

  const renderLogo = darkMode ? (
    <img src={logo} alt='movieous logo' className='h-6 sm:h-8' />
  ) : (
    <img src={logoDark} alt='movieous logo' className='h-6 sm:h-8' />
  )

  return (
    <aside className='border-r h-screen flex flex-col items-center py-6 dark:text-[#aaa]'>
      <Link to='/'>{renderLogo}</Link>

      <nav className='flex-1 mt-8'>
        <ul className='space-y-4'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? 'text-black dark:text-white' : '') + ' flex items-center gap-1'}
            >
              <GoHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/movies'
              className={({ isActive }) => (isActive ? 'text-black dark:text-white' : '') + ' flex items-center gap-1'}
            >
              <MdOutlineLocalMovies /> Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/actors'
              className={({ isActive }) => (isActive ? 'text-black dark:text-white' : '') + ' flex items-center gap-1'}
            >
              <AiOutlineUsergroupAdd /> Actors
            </NavLink>
          </li>
        </ul>
      </nav>

      <div>
        <p className='font-bold dark:text-white'>Admin</p>
        <button className='flex items-center gap-1' onClick={handleLogout}>
          <AiOutlineLogout /> Logout
        </button>
      </div>
    </aside>
  )
}

export default AuthNav
