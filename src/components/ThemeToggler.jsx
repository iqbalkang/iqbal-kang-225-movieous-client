import React from 'react'
import useTheme from '../hooks/useTheme'
import { HiOutlineSun, HiSun } from 'react-icons/hi'

const ThemeToggler = () => {
  const { toggleTheme, darkMode } = useTheme()

  const renderThemeIcon = () => (darkMode ? <HiOutlineSun size={26} /> : <HiSun size={26} />)

  return <button onClick={toggleTheme}> {renderThemeIcon()} </button>
}

export default ThemeToggler
