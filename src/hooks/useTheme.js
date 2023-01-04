import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeProvider'

const useTheme = () => useContext(ThemeContext)

export default useTheme
