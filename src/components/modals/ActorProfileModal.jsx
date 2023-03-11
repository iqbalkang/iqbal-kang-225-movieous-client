import React, { useState, useEffect } from 'react'
import Modal from '../Modal'
import { getActor } from '../../apis/actor'

const ActorProfileModal = ({ visible, closeModal, selectedProfile }) => {
  const [actor, setActor] = useState({})

  const fetchSingleActor = async () => {
    const { data, error } = await getActor(selectedProfile)
    setActor(data.actor)
  }

  useEffect(() => {
    if (selectedProfile) fetchSingleActor()
  }, [selectedProfile])

  const { image, name, about } = actor

  if (!visible) return null

  return (
    <Modal closeModal={closeModal} className='py-0 text-blackish dark:text-offwhite text-sm h-fit w-fit'>
      <img src={image} alt={name} className='w-full h-72  object-cover' />
      <div className='px-4 pb-4 pt-2 leading-6 max-h-72 overflow-y-scroll'>
        <h2 className='text-xl capitalize font-semibold'>{name}</h2>
        <p className='max-w-md'>{about}</p>
      </div>
    </Modal>
  )
}

export default ActorProfileModal
