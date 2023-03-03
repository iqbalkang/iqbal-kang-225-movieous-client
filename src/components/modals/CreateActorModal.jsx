import React from 'react'
import ActorForm from '../ActorForm'
import Modal from '../Modal'

const CreateActorModal = ({ visible, closeModal, selectedProfile, handleEditSubmit }) => {
  if (!visible) return null

  return (
    <Modal closeModal={closeModal} className='h-fit w-fit px-6'>
      <ActorForm closeModal={closeModal} selectedProfile={selectedProfile} handleEditSubmit={handleEditSubmit} />
    </Modal>
  )
}

export default CreateActorModal
