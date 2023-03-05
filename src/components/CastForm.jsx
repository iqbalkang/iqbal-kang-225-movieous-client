import React, { useState, useEffect } from 'react'
import useNotification from '../hooks/useNotification'

import LiveSearch from './LiveSearch'
import CastModal from './modals/CastModal'
import LiveSearchButton from './LiveSearchButton'
import Input from './Input'
import Label from './Label'

const defaultCastInfo = {
  actor: null,
  leadActor: false,
  roleAs: '',
}

const CastForm = ({ onClick, cast, deleteCast }) => {
  const { renderNotification } = useNotification()

  const [castInfo, setCastInfo] = useState(defaultCastInfo)
  const [castModal, setCastModal] = useState(false)
  const { actor, leadActor, roleAs } = castInfo

  const handleOnChange = e => {
    const { checked, name, value } = e.target
    if (name === 'leadActor') return setCastInfo({ ...castInfo, leadActor: checked })
    setCastInfo({ ...castInfo, [name]: value })
  }

  const handleOnClick = () => {
    if (!actor || !roleAs) return renderNotification('warning', 'Please enter cast details')

    onClick(castInfo)
    setCastInfo(defaultCastInfo)
  }

  const updateActor = actor => {
    setCastInfo({ ...castInfo, actor })
  }

  const toggleCastModal = () => setCastModal(prevState => !prevState)

  const handleDeleteCast = member => {
    deleteCast(member)
  }

  useEffect(() => {
    if (!cast.length) setCastModal(false)
  }, [cast])

  return (
    <div className='relative'>
      <h2 className='text-accent dark:text-custom-yellow'>Add Cast & Crew</h2>
      <div className='flex gap-2 items-center relative'>
        <Input
          type='checkbox'
          name='leadActor'
          id='leadActor'
          className='peer md:w-fit'
          onChange={handleOnChange}
          checked={leadActor}
        />

        <Label htmlFor='leadActor' className='text-[16px]'>
          lead actor
        </Label>
        <LiveSearchButton active={cast.length} onClick={toggleCastModal} />
      </div>
      <div className='flex gap-2'>
        <div className='flex-1'>
          <LiveSearch name='cast' onClick={updateActor} value={actor?.name} />
        </div>
        <p className='toggle-text'>as</p>
        <Input name='roleAs' placeholder='role as' value={roleAs} onChange={handleOnChange} className='md:w-24 py-0' />
        <button
          type='button'
          className='bg-accent dark:bg-custom-yellow px-4 text-white dark:text-black rounded'
          onClick={handleOnClick}
        >
          Add
        </button>
      </div>

      <CastModal
        visible={castModal && cast?.length > 0}
        closeModal={toggleCastModal}
        cast={cast}
        handleDeleteCast={handleDeleteCast}
      />
    </div>
  )
}

export default CastForm
