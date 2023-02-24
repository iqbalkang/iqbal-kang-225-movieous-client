import React, { useState } from 'react'

import { postTrailer } from '../apis/movie'
import { FileUploader } from 'react-drag-drop-files'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import useNotification from '../hooks/useNotification'
import ProgressBar from './ProgressBar'

const UploadTrailer = ({ handleChange, visible }) => {
  const { renderNotification } = useNotification()
  const fileTypes = ['mp4', 'avi']

  if (visible) return null

  const handleTypeError = error => renderNotification('error', error)
  return (
    <div className=' rounded bg-white dark:bg-modal w-[40rem] h-[35rem] shadow-md cursor-auto overflow-y-scroll flex justify-center items-center'>
      <FileUploader handleChange={handleChange} types={fileTypes} onTypeError={handleTypeError}>
        <div className='text-[#aaa] flex flex-col items-center justify-center border border-dashed h-40 w-40 rounded-full cursor-pointer'>
          <AiOutlineCloudUpload size={48} />
          <p className='text-sm'>Drop your file here</p>
        </div>
      </FileUploader>
    </div>
  )
}

export default UploadTrailer
