import customFetch from '../utils/axios'

const postRegister = async userInfo => {
  try {
    const { data } = await customFetch.post(`/auth/register`, userInfo)
    return { data }
  } catch (error) {
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const postLogin = async userInfo => {
  try {
    const { data } = await customFetch.post(`/auth/login`, userInfo)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const postVerify = async info => {
  try {
    const { data } = await customFetch.post('/auth/verify-user', info)
    return { data }
  } catch (error) {
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const postForgotPassword = async info => {
  try {
    const { data } = await customFetch.post('/auth/forgot-password', info)
    return { data }
  } catch (error) {
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const postVerifyResetPasswordToken = async info => {
  try {
    const { data } = await customFetch.post('/auth/verify-reset-password-token', info)
    return { data }
  } catch (error) {
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const postResetPassword = async info => {
  try {
    const { data } = await customFetch.post('/auth/reset-password', info)
    return { data }
  } catch (error) {
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

export { postRegister, postVerify, postLogin, postForgotPassword, postVerifyResetPasswordToken, postResetPassword }
