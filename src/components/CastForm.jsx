import React, { useState } from 'react'
import { results } from '../utils/fakeData'
import LiveSearch from './LiveSearch'
import useNotification from '../hooks/useNotification'
import InnerModal from './InnerModal'
import { IoMdClose } from 'react-icons/io'

const defaultCastInfo = {
  actor: null,
  leadActor: false,
  roleAs: '',
}

const CastForm = ({ onClick, cast, toggleWritersModal, modal, deleteCast }) => {
  const { renderNotification } = useNotification()
  const [castInfo, setCastInfo] = useState(defaultCastInfo)
  const [reset, setReset] = useState(false)

  const handleOnChange = e => {
    const { checked, name, value } = e.target
    if (name === 'leadActor') return setCastInfo({ ...castInfo, leadActor: checked })
    setCastInfo({ ...castInfo, [name]: value })
  }

  const handleOnClick = () => {
    if (!castInfo.actor || !castInfo.roleAs) return renderNotification('warning', 'Please enter cast details')
    onClick(castInfo)
    setCastInfo(defaultCastInfo)
    setReset(true)

    setTimeout(() => {
      setReset(false)
    }, 1000)
  }

  const updateActor = actor => {
    setCastInfo({ ...castInfo, actor })
  }

  const handleButtonClick = () => {
    toggleWritersModal()
  }

  const handleDeleteCast = member => {
    deleteCast(member)
  }

  const renderCast = () => {
    return cast.map((member, index) => {
      const { avatar, name } = member.actor
      return (
        <div className='flex items-center gap-8 justify-between' key={index}>
          <div className='flex items-center gap-2'>
            <img src={avatar} alt='' className='h-12 w-12 bg-red-400 object-cover rounded-full' />
            <div>
              <p className='capitalize whitespace-nowrap'>{name}</p>
              {member.leadActor && (
                <span className='text-[10px] bg-white rounded-full p-1 text-black capitalize'>lead actor</span>
              )}
            </div>
          </div>
          <IoMdClose className='cursor-pointer hover:text-custom-yellow' onClick={handleDeleteCast.bind(null, index)} />
        </div>
      )
    })
  }

  const { actor, leadActor, roleAs } = castInfo

  return (
    <div className='dark:text-white'>
      {modal && cast.length > 0 && (
        <InnerModal closeModal={toggleWritersModal}>
          <div className='space-y-4'>{renderCast()}</div>
        </InnerModal>
      )}
      <p className='text-custom-yellow'>Add Cast & Crew</p>
      <div className='flex gap-2 items-center'>
        <input
          type='checkbox'
          name='leadActor'
          id='leadActor'
          className='peer'
          onChange={handleOnChange}
          checked={leadActor}
        />
        <label htmlFor='leadActor' className='text-[#aaa] dark:peer-checked:text-white mr-auto'>
          Lead Actor
        </label>
        <button
          className='text-xs capitalize dark:disabled:text-[#aaa] disabled:cursor-not-allowed'
          type='button'
          onClick={handleButtonClick}
          disabled={cast.length === 0}
        >
          view all
        </button>
      </div>
      <div className='flex gap-2'>
        <div className='flex-1'>
          <LiveSearch results={results} placeholder='search profile' onClick={updateActor} resetInput={reset} />
        </div>
        <p>as</p>
        <input
          type='text'
          name='roleAs'
          placeholder='role as'
          value={roleAs}
          onChange={handleOnChange}
          className='bg-transparent outline-none border-[1px] border-[#aaa] w-28 px-1 rounded dark:focus:border-white'
        />
        <button type='button' className='bg-custom-yellow px-4 text-black rounded' onClick={handleOnClick}>
          Add
        </button>
      </div>
    </div>
  )
}

export default CastForm
