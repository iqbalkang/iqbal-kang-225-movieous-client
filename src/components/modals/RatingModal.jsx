import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { AiFillStar } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'

import SubmitButton from '../SubmitButton'
import RatingStars from '../users/RatingStars'
import { postReview, updateReview } from '../../apis/review'
import useNotification from '../../hooks/useNotification'
import { Link } from 'react-router-dom'

const RatingModal = ({ visible, closeModal, movieId, onSubmit, initialState }) => {
  const modalClasses = 'h-fit max-w-md rating flex flex-col items-center dark:text-offwhite'
  const spanClasses = 'mt-4 mb-1 capitalize text-sm text-accent dark:text-custom-yellow'
  const textAreaClasess =
    'p-1 w-full bg-transparent first-letter:capitalize outline-none border-grayish border h-20 toggle-text focus:border-black dark:focus:border-white peer resize-none'

  const { renderNotification } = useNotification()
  const { authInfo } = useAuth()
  const { isVerified } = authInfo.user || {}

  const [loading, setLoading] = useState(false)
  const [showVerificationLink, setShowVerificationLink] = useState(false)
  const [review, setReview] = useState({
    comment: '',
    rating: null,
  })

  const handleOnChange = e => setReview({ ...review, comment: e.target.value })
  const handleRatingChange = rating => setReview({ ...review, rating })

  const handleOnSubmit = async e => {
    e.preventDefault()
    if (!isVerified) {
      setShowVerificationLink(true)
      return renderNotification('error', 'Account is not verified')
    }

    setLoading(true)

    if (initialState) {
      const { data, error } = await updateReview(initialState.reviewId, review)
      onSubmit(data.reviews, review, data.review)
      setLoading(false)
      return closeModal()
    }

    const { data, error } = await postReview(movieId, review)
    setLoading(false)

    if (error) {
      renderNotification('error', error.message)
      return closeModal()
    }

    onSubmit(data.reviews, review)
    renderNotification('success', data.message)
    closeModal()
  }

  const renderVerificationLink = () => {
    return (
      showVerificationLink && (
        <Link to='/verification' className='text-custom-yellow mt-2  text-xs text-center block hover:underline'>
          Verify account to proceed
        </Link>
      )
    )
  }

  useEffect(() => {
    if (initialState) {
      const { rating, comment } = initialState
      setReview({ rating, comment })
    }
  }, [initialState])

  if (!visible) return null

  return (
    <Modal closeModal={closeModal} className={modalClasses}>
      <BigStar />
      <span className={spanClasses}>rate this</span>
      <h2 className='capitalize  text-xl font-semibold'>top gun</h2>

      <div className=''>
        <RatingStars onSubmit={handleRatingChange} initialRating={review.rating} />
        <form className='mt-2' onSubmit={handleOnSubmit}>
          <textarea
            name='review'
            id='review'
            value={review.comment}
            className={textAreaClasess}
            onChange={handleOnChange}
          ></textarea>
          <SubmitButton text='rate' uploading={loading} />
        </form>
        {renderVerificationLink()}
      </div>
    </Modal>
  )
}

export default RatingModal

const BigStar = () => {
  return (
    <div className='flex justify-center  items-center absolute top-0 -translate-y-1/2'>
      <AiFillStar className='h-24 w-24 text-[#E06C9F]' />
      <p className='absolute text-xl text-white'>?</p>
    </div>
  )
}
