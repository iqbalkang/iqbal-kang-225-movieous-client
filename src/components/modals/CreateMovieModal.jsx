import React, { useState } from 'react'
import { postTrailer } from '../../apis/movie'
import ActorForm from '../ActorForm'
import Modal from '../Modal'
import MovieForm from '../MovieForm'
import ProgressBar from '../ProgressBar'
import UploadTrailer from '../UploadTrailer'

const CreateMovieModal = ({ visible, closeModal }) => {
  const [videoSelected, setVideoSelected] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoUploaded, setVideoUploaded] = useState(false)

  const [trailerInfo, setTrailerInfo] = useState({})
  const [movieFormVisible, setMovieFormVisible] = useState(false)

  const handleChange = async file => {
    setVideoSelected(true)
    const trailer = new FormData()
    trailer.append('trailer', file)

    const { data } = await postTrailer(trailer, setUploadProgress)
    setTrailerInfo(data)
    setVideoUploaded(true)
  }

  if (!visible) return null

  return (
    <Modal closeModal={closeModal}>
      <MovieForm trailer={trailerInfo} closeModal={closeModal} toggleVideoStates={1} />
      {/* <UploadTrailer visible={videoSelected} handleChange={handleChange} />
      {videoSelected && (
        <>
          <ProgressBar videoUploaded={videoUploaded} videoSelected={videoSelected} uploadProgress={uploadProgress} />
          <MovieForm trailer={trailerInfo} closeModal={closeModal} toggleVideoStates={1} />
        </>
      )} */}
    </Modal>
  )
}

export default CreateMovieModal
