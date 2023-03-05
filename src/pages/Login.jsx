import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import FormRow from '../components/FormRow'
import VerticalContainer from '../components/VerticalContainer'
import useNotification from '../hooks/useNotification'
import useAuth from '../hooks/useAuth'
import Form from '../components/Form'
import validateUserInfo from '../utils/validateInputs'
import SubmitButton from '../components/SubmitButton'

const Login = () => {
  const navigate = useNavigate()

  const { renderNotification } = useNotification()
  const { signIn, authInfo } = useAuth()

  const { user, isLoading, error } = authInfo

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const { email, password } = userInfo

  const changeHandler = e => {
    const { name, value } = e.target
    setUserInfo(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const { valid, err } = validateUserInfo(userInfo)
    if (!valid) return renderNotification('error', err)

    await signIn(userInfo)
  }

  useEffect(() => {
    if (user) navigate('/')

    if (error) renderNotification('error', error)
  }, [user, error])

  return (
    <VerticalContainer>
      <AuthCard title='Login'>
        <Form onSubmit={handleSubmit}>
          <FormRow placeholder='johndoe@gmail.com' name='email' value={email} onchange={changeHandler} />
          <FormRow placeholder='******' type='password' name='password' value={password} onchange={changeHandler} />
          <SubmitButton uploading={isLoading} text='login' />
          <div className='flex justify-between'>
            <Link to='/forgot-password' className='hover:text-accent duration-200'>
              Forgot password
            </Link>
            <Link to='/register' className='hover:text-accent duration-200'>
              Register
            </Link>
          </div>
        </Form>
      </AuthCard>
    </VerticalContainer>
  )
}

export default Login
