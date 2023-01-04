import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const ThemeContext = createContext()

const defaultTheme = 'light'
const darkTheme = 'dark'

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState()

  const toggleTheme = () => {
    const savedTheme = getLocalStorage('theme')

    const { theme: oldTheme = defaultTheme, darkMode = false } = savedTheme || {}

    setDarkMode(prevMode => !prevMode)

    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme

    document.documentElement.classList.remove(oldTheme)
    document.documentElement.classList.add(newTheme)

    const theme = { theme: newTheme, darkMode: !darkMode }
    setLocalStorage('theme', theme)
  }

  useEffect(() => {
    const theme = getLocalStorage('theme') || defaultTheme

    document.documentElement.classList.add(theme.theme)
    setDarkMode(theme.darkMode)
  }, [])

  return <ThemeContext.Provider value={{ toggleTheme, darkMode }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
