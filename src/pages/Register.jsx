import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postRegister } from '../apis/requests'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import Form from '../components/Form'
import FormRow from '../components/FormRow'
import VerticalContainer from '../components/VerticalContainer'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'

const validateUserInfo = userInfo => {
  const { name, email, password } = userInfo

  const isValidName = /^[A-Z a-z]+$/
  const isValidEmail = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

  if (!name.trim()) return { valid: false, err: 'Please enter a name' }
  if (!isValidName.test(name)) return { valid: false, err: 'Invalid name' }

  if (!email.trim()) return { valid: false, err: 'Please enter an email' }
  if (!isValidEmail.test(email)) return { valid: false, err: 'Invalid email' }

  if (!password.trim()) return { valid: false, err: 'Please enter a password' }
  if (password.length < 6) return { valid: false, err: 'Password has to be atleast 6 characters long' }

  return { valid: true }
}

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
          <Button>Register</Button>
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
