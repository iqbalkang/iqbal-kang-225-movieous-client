import { postLogin, postVerify } from '../apis/requests'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localStorage'

const { useState, createContext } = require('react')

const AuthContext = createContext()

const initialState = {
  user: getLocalStorage('user'),
  isLoading: false,
  error: '',
  success: '',
}

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(initialState)

  const signIn = async userInfo => {
    setAuthInfo({ ...initialState, isLoading: true })

    const { data, error } = await postLogin(userInfo)

    if (error) return setAuthInfo({ ...initialState, isLoading: false, error: error.message })

    setAuthInfo({ ...initialState, isLoading: false, user: data.user })
    setLocalStorage('user', data.user)
  }

  const verifyEmail = async userInfo => {
    setAuthInfo({ ...initialState, isLoading: true })

    const { data, error } = await postVerify(userInfo)

    if (error) return setAuthInfo({ ...initialState, isLoading: false, error: error.message })

    setAuthInfo({ ...initialState, isLoading: false, user: data.user, success: data.message })
    setLocalStorage('user', data.user)
  }

  const logout = () => {
    removeLocalStorage('user')
    setAuthInfo(initialState)
  }

  return <AuthContext.Provider value={{ authInfo, signIn, verifyEmail, logout }}> {children} </AuthContext.Provider>
}

export { AuthContext }

export default AuthProvider
