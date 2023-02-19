import React, { useState } from 'react'

import { postTrailer } from '../apis/movie'
import { FileUploader } from 'react-drag-drop-files'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import useNotification from '../hooks/useNotification'
import ProgressBar from './ProgressBar'

const UploadTrailer = () => {
  const [videoSelected, setVideoSelected] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoUploaded, setVideoUploaded] = useState(false)

  const { renderNotification } = useNotification()
  const fileTypes = ['mp4', 'avi']

  const handleChange = async file => {
    setVideoSelected(true)
    const trailer = new FormData()
    trailer.append('video', file)

    await postTrailer(trailer, setUploadProgress)
    setVideoUploaded(true)
  }

  const displayMessage = () => {
    if (uploadProgress < 100) return `${uploadProgress}%`
    else return 'Processing'
  }

  if (videoSelected && uploadProgress >= 100 && videoUploaded) return null

  if (videoSelected && uploadProgress <= 100)
    return <ProgressBar uploadProgress={uploadProgress} message={displayMessage()} />

  const handleTypeError = error => renderNotification('error', error)
  return (
    <FileUploader handleChange={handleChange} types={fileTypes} onTypeError={handleTypeError}>
      <div className='text-[#aaa] flex flex-col items-center justify-center border border-dashed h-40 w-40 rounded-full cursor-pointer'>
        <AiOutlineCloudUpload size={48} />
        <p className='text-sm'>Drop your file here</p>
      </div>
    </FileUploader>
  )
}

export default UploadTrailer
