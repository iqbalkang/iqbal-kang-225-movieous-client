import React, { useState, useEffect } from 'react'
import { postActor, updateActor } from '../apis/actor'
import { genderOptions } from '../utils/options'
import PosterUploader from './PosterUploader'
import Select from './Select'
import useNotification from '../hooks/useNotification'
import { ImSpinner2 } from 'react-icons/im'

const modalContainerClasses = 'w-[30rem] dark:bg-modal p-2 py-4 cursor-auto'
const inputsClasses =
  'w-3/4 bg-transparent capitalize border-b border-b-[#aaa] dark:text-white outline-none dark:focus:border-b-white'

const defaultActorInfo = {
  image: null,
  gender: '',
  about: '',
  name: '',
}

const ActorForm = ({ closeModal, selectedProfile, handleEditSubmit }) => {
  const { renderNotification } = useNotification()
  const [actorInfo, setActorInfo] = useState(defaultActorInfo)
  const [selectedPoster, setSelectedPoster] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnChange = e => {
    const { name, value, files } = e.target

    if (name === 'poster') {
      const poster = files[0]
      setSelectedPoster(URL.createObjectURL(poster))
      return setActorInfo({ ...actorInfo, image: poster })
    }

    setActorInfo({ ...actorInfo, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()

    for (let key in actorInfo) {
      if (!actorInfo[key]) return renderNotification('error', 'Please fill in the form')
      setLoading(true)
      console.log(key, actorInfo[key])
      formData.append(key, actorInfo[key])
    }

    if (selectedProfile) {
      const { data, error } = await updateActor(selectedProfile.actorId, formData)
      setLoading(false)
      if (data) {
        renderNotification('success', 'Actor updated successfully')
        handleEditSubmit(data.actor)
      }

      if (error) renderNotification('error', error)
      return closeModal()
    }

    const { data, error } = await postActor(formData)
    setLoading(false)
    if (data) renderNotification('success', 'Actor created successfully')
    if (error) renderNotification('error', error)
    closeModal()
  }

  useEffect(() => {
    if (selectedProfile) {
      setActorInfo({ ...selectedProfile })
      setSelectedPoster(selectedProfile.image)
    }
  }, [selectedProfile])

  return (
    <div className={modalContainerClasses}>
      <form onSubmit={handleSubmit}>
        <div className=' flex justify-between mb-4'>
          <h2 className='text-xl capitalize dark:text-white'>
            {selectedProfile ? 'Update actor' : 'create new actor'}
          </h2>
          <button className=' bg-custom-yellow w-24 rounded capitalize flex justify-center items-center'>
            {loading ? <ImSpinner2 className='animate-spin' /> : selectedProfile ? 'update' : 'create'}
          </button>
        </div>

        <div className='grid grid-cols-[30%,70%] gap-2 mb-4'>
          {/* <PosterUploader /> */}
          <PosterUploader onChange={handleOnChange} selectedPoster={selectedPoster} />
          <div className='space-y-4'>
            <input
              type='text'
              name='name'
              placeholder='enter name'
              className={inputsClasses}
              value={actorInfo.name}
              onChange={handleOnChange}
            />
            <textarea
              name='about'
              className={inputsClasses + ' resize-none h-24'}
              placeholder='about the actor'
              value={actorInfo.about}
              onChange={handleOnChange}
            ></textarea>
          </div>
        </div>

        <Select
          label='gender'
          name='gender'
          options={genderOptions}
          value={actorInfo.gender}
          onChange={handleOnChange}
        />
      </form>
    </div>
  )
}

export default ActorForm
