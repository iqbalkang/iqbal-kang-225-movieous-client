import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import { HiOutlineSun, HiSun } from 'react-icons/hi'
import Container from './Container'
import Input from './Input'
import useTheme from '../hooks/useTheme'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const navigate = useNavigate()

  const { toggleTheme, darkMode } = useTheme()
  const { authInfo, logout } = useAuth()
  const { user } = authInfo

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const renderThemeIcon = () => (darkMode ? <HiOutlineSun size={26} /> : <HiSun size={26} />)

  const renderAuthButton = user ? (
    <button className='capitalize' onClick={handleLogout}>
      logout
    </button>
  ) : (
    <Link to='login' className='capitalize'>
      Login
    </Link>
  )

  return (
    <nav className='bg-background py-2 text-white'>
      <Container>
        <div className='flex justify-between items-center'>
          <Link to='/'>
            <img src={logo} alt='movieous logo' className='h-6 sm:h-8 md:h-10' />
          </Link>

          <div className='flex items-center gap-4'>
            <button onClick={toggleTheme}> {renderThemeIcon()} </button>
            <Input placeholder='search...' className='md:focus:w-80' />
            {renderAuthButton}
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar
