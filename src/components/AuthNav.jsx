import React, { useEffect } from 'react'
import { GoHome } from 'react-icons/go'
import { MdOutlineLocalMovies } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import logoDark from '../images/logo-dark.png'
import { AiOutlineLogout, AiOutlineUsergroupAdd } from 'react-icons/ai'
import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'

const menuItems = [
  {
    item: 'home',
    path: '/',
    icon: <GoHome />,
  },
  {
    item: 'actors',
    path: '/actors',
    icon: <AiOutlineUsergroupAdd />,
  },
  {
    item: 'movies',
    path: '/movies',
    icon: <MdOutlineLocalMovies />,
  },
]

const AuthNav = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { darkMode } = useTheme()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderLogo = <img src={darkMode ? logo : logoDark} alt='movieous logo' className='h-6 sm:h-8' />

  const renderActiveItemStyles = () => {
    return ({ isActive }) => (isActive ? 'text-black dark:text-white' : '') + ' capitalize flex items-center gap-1'
  }

  const renderMenuItems = menuItems.map(menuItem => {
    const { item, icon, path } = menuItem
    return <MenuItem key={item} classes={renderActiveItemStyles()} {...menuItem} />
  })

  return (
    <aside className='border-r h-screen flex flex-col items-center py-6 dark:text-grayish'>
      <Link to='/'>{renderLogo}</Link>

      <nav className='flex-1 mt-8'>
        <ul className='space-y-4'>{renderMenuItems}</ul>
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

const MenuItem = ({ path, item, icon, classes }) => {
  return (
    <li>
      <NavLink to={path} className={classes}>
        {icon}
        {item}
      </NavLink>
    </li>
  )
}
