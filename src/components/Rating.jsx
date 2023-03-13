import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const Rating = ({ ratingAvg, reviewCount }) => {
  return (
    <div className='flex items-center gap-1 text-accent dark:text-custom-yellow text-sm capitalize'>
      {ratingAvg ? (
        <>
          <AiFillStar />
          <span>{ratingAvg}</span>
          <span className='text-blackish dark:text-grayish'>
            ({reviewCount} {reviewCount > 1 ? ' reviews' : ' review'})
          </span>
        </>
      ) : (
        'no reviews'
      )}
    </div>
  )
}

export default Rating
