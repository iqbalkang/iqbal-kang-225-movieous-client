import React from 'react'

const PosterUploader = ({ onChange, selectedPoster }) => {
  return (
    <div>
      <input
        type='file'
        id='poster'
        name='poster'
        accept='image/jpg, image/jpeg, image/png, image/webp'
        hidden
        onChange={onChange}
      />
      <label htmlFor='poster' className='cursor-pointer dark:text-[#aaa]'>
        {selectedPoster ? (
          <img src={selectedPoster} className='rounded' />
        ) : (
          <div className='border border-[#aaa] border-dashed h-24 flex justify-center items-center rounded'>
            <p>Select Poster</p>
          </div>
        )}
      </label>
    </div>
  )
}

export default PosterUploader
