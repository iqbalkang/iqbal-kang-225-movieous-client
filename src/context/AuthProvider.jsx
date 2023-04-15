import { postLogin, postRegister, postVerify } from '../apis/requests'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localStorage'

import { useLocation, useNavigate } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'

const AuthContext = createContext()

const initialState = {
  user: null,
  isLoading: false,
  error: '',
  success: '',
}

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(initialState)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setAuthInfo({ ...initialState, user: getLocalStorage('user') })
  }, [])

  const register = async userInfo => {
    setAuthInfo({ ...initialState, isLoading: true })

    const { data, error } = await postRegister(userInfo)

    if (error) return setAuthInfo({ ...initialState, isLoading: false, error: error.message })

    setAuthInfo({ ...initialState, isLoading: false, user: data.user })
    setLocalStorage('user', data.user)
    return data
    // if (data.user?.isAdmin) return navigate('/', { replace: true })
    // navigate(location.state, { replace: true })
  }

  const signIn = async userInfo => {
    setAuthInfo({ ...initialState, isLoading: true })

    const { data, error } = await postLogin(userInfo)

    if (error) return setAuthInfo({ ...initialState, isLoading: false, error: error.message })

    setAuthInfo({ ...initialState, isLoading: false, user: data.user })
    setLocalStorage('user', data.user)
    if (data.user?.isAdmin) return navigate('/', { replace: true })
    navigate(location.state, { replace: true })
  }

  const verifyEmail = async userInfo => {
    setAuthInfo({ ...initialState, isLoading: true })

    const { data, error } = await postVerify(userInfo)

    if (error) return setAuthInfo({ ...initialState, isLoading: false, error: error.message, user: authInfo.user })

    setAuthInfo({ ...initialState, isLoading: false, user: data.user, success: data.message })
    setLocalStorage('user', data.user)
  }

  const logout = () => {
    removeLocalStorage('user')
    setAuthInfo({ ...initialState, user: null })
  }

  return (
    <AuthContext.Provider value={{ authInfo, register, signIn, verifyEmail, logout }}>{children}</AuthContext.Provider>
  )
}

export { AuthContext }

export default AuthProvider
