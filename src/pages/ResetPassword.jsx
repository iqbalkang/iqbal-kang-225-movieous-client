import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { postResetPassword, postVerifyResetPasswordToken } from '../apis/requests'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import Form from '../components/Form'
import FormRow from '../components/FormRow'
import VerticalContainer from '../components/VerticalContainer'
import useNotification from '../hooks/useNotification'

const validatePasswords = ({ newPassword, confirmPassword }) => {
  if (!newPassword.trim() && !confirmPassword.trim()) return { valid: false, err: 'Please enter a passwords' }
  if (newPassword.length < 5) return { valid: false, err: 'Password has to be atleast 5 characters long' }
  if (newPassword !== confirmPassword) return { valid: false, err: 'Passwords do not match' }

  return { valid: true }
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const { renderNotification } = useNotification()

  const [searchParams, setsearchParams] = useSearchParams()
  const token = searchParams.get('token')
  const userId = searchParams.get('user')

  const [isDisable, setIsDisable] = useState(false)
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  })

  const { newPassword, confirmPassword } = passwords

  const changeHandler = e => {
    const { name, value } = e.target
    setPasswords(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const { valid, err } = validatePasswords(passwords)
    if (!valid) return renderNotification('error', err)

    const { data, error } = await postResetPassword({ token, userId, ...passwords })
    if (error) return renderNotification('error', error.message)

    renderNotification('success', data.message)
    navigate('/login')
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await postVerifyResetPasswordToken({ token, userId })

      if (error) {
        setIsDisable(true)
        console.log(isDisable)
        renderNotification('error', error.message)
        setTimeout(() => {
          navigate('/')
          setIsDisable(false)
        }, 2000)
      }

      renderNotification('success', data.message)
    }

    fetchData()
  }, [])

  return (
    <VerticalContainer>
      <AuthCard title='enter new password'>
        <fieldset disabled={isDisable} className='disabled:cursor-not-allowed'>
          <Form onSubmit={handleSubmit}>
            <FormRow
              placeholder='******'
              type='password'
              name='newPassword'
              label='new password'
              value={newPassword}
              onchange={changeHandler}
            />
            <FormRow
              placeholder='******'
              type='password'
              name='confirmPassword'
              label='confirm password'
              value={confirmPassword}
              onchange={changeHandler}
            />
            <Button>confirm</Button>
          </Form>
        </fieldset>
      </AuthCard>
    </VerticalContainer>
  )
}

export default ResetPassword
