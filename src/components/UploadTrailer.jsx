import React, { useState } from 'react'

// import { postTrailer } from '../apis/movie'
import { FileUploader } from 'react-drag-drop-files'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import useNotification from '../hooks/useNotification'
// import ProgressBar from './ProgressBar'
import VerticalContainer from './VerticalContainer'

const UploadTrailer = ({ handleChange, visible }) => {
  const { renderNotification } = useNotification()
  const fileTypes = ['mp4', 'avi', 'mkv']

  if (visible) return null

  const handleTypeError = error => renderNotification('error', error)
  return (
    <VerticalContainer>
      <FileUploader handleChange={handleChange} types={fileTypes} onTypeError={handleTypeError}>
        <div className='text-[#aaa] flex flex-col items-center justify-center border border-dashed h-40 w-40 rounded-full cursor-pointer'>
          <AiOutlineCloudUpload size={48} />
          <p className='text-sm'>Drop your file here</p>
        </div>
      </FileUploader>
    </VerticalContainer>
  )
}

export default UploadTrailer
