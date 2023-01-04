import React from 'react'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import FormRow from '../components/FormRow'
import VerticalContainer from '../components/VerticalContainer'

const ConfirmPassword = () => {
  return (
    <VerticalContainer>
      <AuthCard title='enter new password'>
        <FormRow placeholder='******' type='password' name='newPassword' label='new password' />
        <FormRow placeholder='******' type='password' name='confirmPassword' label='confirm password' />
        <Button>confirm</Button>
      </AuthCard>
    </VerticalContainer>
  )
}

export default ConfirmPassword
