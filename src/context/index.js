import React from 'react'
import AuthProvider from './AuthProvider'
import ConfirmModalProvider from './ConfirmModalProvider'
import MoviesProvider from './MoviesProvider'
import NotificationProvider from './NotificationProvider'
import ThemeProvider from './ThemeProvider'

const ContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <ConfirmModalProvider>
        <MoviesProvider>
          <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthProvider>
        </MoviesProvider>
      </ConfirmModalProvider>
    </NotificationProvider>
  )
}

export default ContextProvider
