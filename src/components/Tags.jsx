import React, { useState, useRef, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'

const Tags = ({ updateTags, tags }) => {
  const tagRef = useRef()
  const divRef = useRef()
  const labelRef = useRef()

  const [input, setInput] = useState('')
  const [enteredTags, setEnteredTags] = useState([])

  const handleOnChange = e => {
    const { value } = e.target
    if (value !== ',' && 'Enter') setInput(value)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      if (!input) return
      if (enteredTags.includes(input)) return setInput('')
      setEnteredTags([...tags, input])
      setInput('')
    }

    if (e.key === 'Backspace') {
      const remainingTags = tags.filter((tag, index) => index !== tags.length - 1)
      if (input) return
      setEnteredTags(remainingTags)
    }
  }

  const deleteTag = input => {
    const remainingTags = tags.filter(tag => tag !== input)
    setEnteredTags(remainingTags)
    tagRef.current.focus()
  }

  const handleOnFocus = () => {
    divRef.current.classList.add('border-black', 'dark:border-white')
    tagRef.current.focus()
    labelRef.current.classList.add('text-[#000]', 'dark:text-white')
  }

  const handleOnBlur = () => {
    divRef.current.classList.remove('border-black', 'dark:border-white')
    labelRef.current.classList.remove('text-[#000]', 'dark:text-white')
  }

  useEffect(() => {
    updateTags(enteredTags)
  }, [enteredTags])

  const renderTags = tags?.map(tag => <Tag key={tag} text={tag} deleteTag={deleteTag} />)

  return (
    <div>
      <label ref={labelRef} htmlFor='enteredTags' className='text-grayish text-sm' onClick={handleOnFocus}>
        Tags
      </label>
      <div
        ref={divRef}
        className='w-full border border-grayish min-h-[32px] rounded flex items-center flex-wrap gap-2 p-1'
      >
        {renderTags}
        <input
          ref={tagRef}
          type='text'
          placeholder='enter tag'
          value={input}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className={`capitalize bg-transparent outline-none dark:text-white ${tags.length ? 'w-20' : 'w-full'}`}
        />
      </div>
    </div>
  )
}

const singleTagStyles = 'toggle-bg px-1 rounded capitalize text-sm flex items-center'

const Tag = ({ text, deleteTag }) => {
  return (
    <span className={singleTagStyles}>
      {text} <IoMdClose className='cursor-pointer' onClick={deleteTag.bind(null, text)} />
    </span>
  )
}

export default Tags
