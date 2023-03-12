import React, { useEffect, useState } from 'react'
import CustomButton from '../components/users/CustomButton'
import { AiFillStar } from 'react-icons/ai'
import { deleteReview, getReviews } from '../apis/review'
import { useParams, useSearchParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'
import { MdDeleteOutline, MdEdit, MdOutlineModeEditOutline } from 'react-icons/md'
import RatingModal from '../components/modals/RatingModal'
import ConfirmModal from '../components/modals/ConfirmModal'

const Reviews = () => {
  const { movieId } = useParams()
  const { renderNotification } = useNotification()

  const { authInfo } = useAuth()
  const { user } = authInfo

  const [searchParams, setsearchParams] = useSearchParams()
  const title = searchParams.get('title')

  const [reviews, setReviews] = useState([])
  const [myReview, setMyReview] = useState(null)
  const [ratingModal, setRatingModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchMovieReviews = async () => {
    const { data, error } = await getReviews(movieId)
    setReviews(data.reviews)
  }

  const toggleRatingModal = () => setRatingModal(prevState => !prevState)
  const toggleConfirmModal = () => setConfirmModal(prevState => !prevState)

  const handleOnSubmit = (_, undefined, rev) => {
    const { reviewId, rating, comment } = rev

    const updatedReviews = reviews.map(review => {
      if (review.reviewId === rev._id) return { ...review, rating, comment }
      else return review
    })

    setReviews(updatedReviews)
    setMyReview({ ...myReview, rating, comment })
  }

  const handleOnReviewDelete = async () => {
    setLoading(true)
    const { data, error } = await deleteReview(myReview.reviewId)

    if (error) return renderNotification('error', error?.message)
    renderNotification('success', data.message)
    setLoading(false)

    const updatedReviews = reviews.filter(review => review.reviewId !== myReview.reviewId)
    setMyReview(null)
    setReviews(updatedReviews)
    toggleConfirmModal()
  }

  console.log(reviews)

  useEffect(() => {
    fetchMovieReviews()
  }, [movieId])

  const handleMyReviewClick = () => {
    if (myReview) return setMyReview(null)

    const ownerReviews = reviews.find(review => review.user.userId === user.userId)
    if (!ownerReviews) return renderNotification('warning', 'You have not reviewed this movie yet.')

    setMyReview(ownerReviews)
  }

  const renderReviews = () => {
    if (myReview)
      return (
        <ReviewCard
          key={myReview.reviewId}
          {...myReview}
          myReview={myReview}
          onClick={toggleRatingModal}
          onDelete={toggleConfirmModal}
        />
      )
    else return reviews.map(review => <ReviewCard key={review.reviewId} {...review} />)
  }

  return (
    <section className='h-full flex-1 py-2'>
      <div className='flex justify-between h-full '>
        <h2 className='text-2xl text-blackish dark:text-grayish capitalize'>
          reviews for: <span className='toggle-text'>{title}</span>
        </h2>
        {user && <CustomButton onClick={handleMyReviewClick}>{myReview ? 'view all' : 'find my review'}</CustomButton>}
      </div>
      <div className='divide-grayish divide-y-2 max-w-xl'>{renderReviews()}</div>
      <RatingModal
        visible={ratingModal}
        closeModal={toggleRatingModal}
        initialState={myReview}
        onSubmit={handleOnSubmit}
      />
      <ConfirmModal
        visible={confirmModal}
        closeModal={toggleConfirmModal}
        forceCloseModals={handleOnReviewDelete}
        text='this action will permanently delete your comment.'
        loading={loading}
      />
    </section>
  )
}

export default Reviews

const renderNameInitial = name => name.slice(0, 1)

const ReviewCard = ({ rating, comment, user, myReview, onClick, onDelete }) => {
  return (
    <div className='flex gap-2 items-center py-6'>
      <div className='h-12 w-12 rounded-full bg-blackish dark:bg-grayish flex justify-center items-center'>
        <p className='capitalize text-xl font-bold text-white dark:text-black'>{renderNameInitial(user?.name)}</p>
      </div>
      <div>
        <div className='flex gap-2'>
          <h3 className='capitalize font-semibold'>{user?.name}</h3>
          <div className='flex items-center text-accent dark:text-custom-yellow'>
            <span>{rating}</span>
            <AiFillStar />
          </div>
        </div>
        <p className='text-blackish dark:text-grayish'>{comment}</p>
        {myReview && (
          <div className='toggle-text space-x-1'>
            <button onClick={onDelete}>
              <MdDeleteOutline />
            </button>
            <button onClick={onClick}>
              <MdEdit />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
