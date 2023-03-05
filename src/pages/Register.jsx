import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postRegister } from '../apis/requests'
import AuthCard from '../components/AuthCard'
import SubmitButton from '../components/SubmitButton'
import Form from '../components/Form'
import FormRow from '../components/FormRow'
import VerticalContainer from '../components/VerticalContainer'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'
import validateUserInfo from '../utils/validateInputs'

const Register = () => {
  const navigate = useNavigate()
  const { renderNotification } = useNotification()
  const {
    authInfo: { user },
  } = useAuth()

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = userInfo

  const changeHandler = e => {
    const { name, value } = e.target
    setUserInfo(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const { valid, err } = validateUserInfo(userInfo)
    if (!valid) return renderNotification('error', err)

    const { data, error } = await postRegister(userInfo)

    if (error) return renderNotification('error', error.message)

    if (data.status === 'success') {
      renderNotification('success', data.message)
      navigate('/verification', {
        state: data,
        replace: true,
      })
    }
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  return (
    <VerticalContainer>
      <AuthCard title='register'>
        <Form onSubmit={handleSubmit}>
          <FormRow placeholder='John Doe' name='name' value={name} onchange={changeHandler} />
          <FormRow placeholder='johndoe@gmail.com' name='email' value={email} onchange={changeHandler} />
          <FormRow placeholder='******' type='password' name='password' value={password} onchange={changeHandler} />
          <SubmitButton text='register' />
          <div className='flex justify-between'>
            <Link to='/forgot-password' className='hover:text-accent duration-200'>
              Forgot password
            </Link>
            <Link to='/login' className='hover:text-accent duration-200'>
              Login
            </Link>
          </div>
        </Form>
      </AuthCard>
    </VerticalContainer>
  )
}

export default Register
