import React, { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'

const RatingStars = ({ onSubmit, initialRating }) => {
  const [rating, setRating] = useState(null)
  const [hovered, setHovered] = useState(null)

  const handleClick = index => {
    setRating(index + 1)
    onSubmit(index + 1)
  }

  useEffect(() => {
    if (initialRating) setRating(initialRating)
  }, [initialRating])

  const renderStars = Array(10)
    .fill('')
    .map((_, index) => (
      <AiFillStar
        key={index}
        color={index < (hovered || rating) ? '#E06C9F' : ''}
        size={24}
        className='cursor-pointer'
        onClick={handleClick.bind(null, index)}
        onMouseEnter={() => setHovered(index + 1)}
        onMouseLeave={() => setHovered(null)}
      />
    ))
  return <div className='flex'>{renderStars}</div>
}

export default RatingStars
