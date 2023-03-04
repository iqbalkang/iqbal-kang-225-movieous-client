import React, { useState, useEffect } from 'react'
import useNotification from '../hooks/useNotification'

import LiveSearch from './LiveSearch'
import CastModal from './modals/CastModal'
import LiveSearchButton from './LiveSearchButton'

const defaultCastInfo = {
  actor: null,
  leadActor: false,
  roleAs: '',
}

const CastForm = ({ onClick, cast, toggleWritersModal, deleteCast }) => {
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
    <div className='dark:text-white relative'>
      <h2 className='text-custom-yellow'>Add Cast & Crew</h2>
      <div className='flex gap-2 items-center relative'>
        <input
          type='checkbox'
          name='leadActor'
          id='leadActor'
          className='peer'
          onChange={handleOnChange}
          checked={leadActor}
        />
        <label htmlFor='leadActor' className='text-[#aaa] dark:peer-checked:text-white'>
          Lead Actor
        </label>
        <LiveSearchButton active={cast.length} onClick={toggleCastModal} />
      </div>
      <div className='flex gap-2'>
        <div className='flex-1'>
          <LiveSearch name='cast' onClick={updateActor} value={actor?.name} />
        </div>
        <p>as</p>
        <input
          type='text'
          name='roleAs'
          placeholder='role as'
          value={roleAs}
          onChange={handleOnChange}
          className='bg-transparent outline-none border-[1px] border-[#aaa] w-28 px-1 rounded dark:focus:border-white'
          autoComplete='off'
        />
        <button type='button' className='bg-custom-yellow px-4 text-black rounded' onClick={handleOnClick}>
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
