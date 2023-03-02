import React from 'react'
import AuthProvider from './AuthProvider'
import MoviesProvider from './MoviesProvider'
import NotificationProvider from './NotificationProvider'
import ThemeProvider from './ThemeProvider'

const ContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <MoviesProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </MoviesProvider>
    </NotificationProvider>
  )
}

export default ContextProvider
