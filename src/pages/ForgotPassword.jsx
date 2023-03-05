import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { postForgotPassword } from '../apis/requests'
import AuthCard from '../components/AuthCard'
import SubmitButton from '../components/SubmitButton'
import Form from '../components/Form'
import FormRow from '../components/FormRow'
import VerticalContainer from '../components/VerticalContainer'
import useNotification from '../hooks/useNotification'
import validateUserInfo from '../utils/validateInputs'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const { renderNotification } = useNotification()

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  const changeHandler = e => {
    const { value } = e.target
    setEmail(value)
  }

  const submitHandler = async e => {
    e.preventDefault()

    const { valid, err } = validateUserInfo({ email })
    if (!valid) return renderNotification('error', err)

    setIsLoading(true)
    const { data, error } = await postForgotPassword({ email })
    setIsLoading(false)

    if (error) return renderNotification('error', error.message)
    if (data) {
      renderNotification('success', data.message)
      navigate('/')
    }
  }

  return (
    <VerticalContainer>
      <AuthCard title='please enter your email'>
        <Form onSubmit={submitHandler}>
          <FormRow placeholder='johndoe@gmail.com' name='email' value={email} onchange={changeHandler} />
          <SubmitButton uploading={isLoading} text='send link' />
        </Form>
      </AuthCard>
    </VerticalContainer>
  )
}

export default ForgotPassword
