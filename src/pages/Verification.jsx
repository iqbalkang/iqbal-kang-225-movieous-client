import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import VerticalContainer from '../components/VerticalContainer'
import SubmitButton from '../components/SubmitButton'
import { postVerify } from '../apis/requests'
import useNotification from '../hooks/useNotification'
import useAuth from '../hooks/useAuth'

const OTP_LENGTH = 6
let activeIndex = 0

const Verification = () => {
  const inputRef = useRef()
  const location = useLocation()
  const navigate = useNavigate()
  const { renderNotification } = useNotification()

  const { verifyEmail, authInfo } = useAuth()
  const { isLoading, error, success, user } = authInfo

  const { userId } = location.state?.user

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  const handleChange = e => {
    const { value } = e.target

    const newOtp = [...otp]
    newOtp[activeOtpIndex] = value.substring(0, 1)
    setOtp(newOtp)

    console.log(otp)
    if (!value) return setActiveOtpIndex(activeIndex - 1)

    if (activeOtpIndex >= OTP_LENGTH - 1) return
    setActiveOtpIndex(activeIndex + 1)
  }

  const handleKeyDown = (e, index) => {
    activeIndex = index
    if (activeOtpIndex <= 0) return
    if (e.key === 'Backspace' && index === 5) setActiveOtpIndex(index)
  }

  const isValidOTP = otp => {
    let valid = false

    for (let char of otp) {
      valid = !isNaN(parseInt(char))
    }
    return valid
  }

  const handleSubmit = async () => {
    if (!isValidOTP(otp)) return renderNotification('error', 'invalid otp')

    const formattedOTP = otp.join('')
    const info = { userId, otp: formattedOTP }

    await verifyEmail(info)
  }

  useEffect(() => {
    if (error) return renderNotification('error', error)

    if (user) {
      renderNotification('success', success)
      navigate('/')
    }
  }, [user, error])

  return (
    <VerticalContainer>
      <div className='bg-background p-8'>
        <div>
          <h3 className='font-bold'>Please enter the OTP to verify your account</h3>
          <h4 className='text-[#777] text-center'>OTP has been sent to your email</h4>
        </div>
        <div className='flex gap-4 justify-center my-6'>
          {otp.map((_, index) => {
            return (
              <input
                key={index}
                className='appearance-none w-10 h-10 text-center rounded bg-transparent border border-grayish outline-none focus:border-white duration-200'
                type='number'
                value={otp[index]}
                onKeyDown={e => handleKeyDown(e, index)}
                onChange={handleChange}
                ref={activeOtpIndex === index ? inputRef : null}
              />
            )
          })}
        </div>
        <SubmitButton onClick={handleSubmit} uploading={isLoading} text='verify' />
        <Link to='/' className='mt-2 inline-block'>
          I don't have OTP
        </Link>
      </div>
    </VerticalContainer>
  )
}

export default Verification
