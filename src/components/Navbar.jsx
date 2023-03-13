import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import Container from './Container'
import Input from './Input'
import useTheme from '../hooks/useTheme'
import useAuth from '../hooks/useAuth'
import Search from './Search'
import ThemeToggler from './ThemeToggler'

const Navbar = () => {
  const navigate = useNavigate()

  // const { toggleTheme, darkMode } = useTheme()
  const { authInfo, logout } = useAuth()
  const { user } = authInfo

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSearchSubmit = query => {
    navigate(`/movie/search?title=${query}`)
  }

  const handleSearchReset = () => {
    navigate(-1)
  }

  // const renderThemeIcon = () => (darkMode ? <HiOutlineSun size={26} /> : <HiSun size={26} />)

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
            <img src={logo} alt='movieous logo' className='h-7 sm:h-8 md:h-10' />
          </Link>

          <div className='flex items-center gap-4'>
            <Link to='/movie/all' className='capitalize'>
              view all
            </Link>
            <ThemeToggler />
            <Search
              placeholder='search'
              onReset={handleSearchReset}
              onSubmit={handleSearchSubmit}
              className='hidden sm:block'
            />
            {renderAuthButton}
          </div>
        </div>
      </Container>
    </nav>
    // <nav className='bg-background py-2 text-white'>
    //   <Container>
    //     <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
    //       <Link to='/'>
    //         <img src={logo} alt='movieous logo' className='h-7 sm:h-8 md:h-10' />
    //       </Link>

    //       <Search
    //         placeholder='search'
    //         onReset={handleSearchReset}
    //         onSubmit={handleSearchSubmit}
    //         className='order-1 md:order-[0] col-span-2 md:col-span-1'
    //       />

    //       <div className='flex items-center gap-2 justify-end'>
    //         <Link to='/movie/all' className='capitalize order-0'>
    //           view all
    //         </Link>
    //         <ThemeToggler />
    //         {renderAuthButton}
    //       </div>
    //     </div>
    //   </Container>
    // </nav>
  )
}

export default Navbar
