import React, { useState, useRef, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'

const Tags = ({ updateTags }) => {
  const tagRef = useRef()
  const divRef = useRef()
  const labelRef = useRef()
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])

  const handleOnChange = e => {
    const { value } = e.target
    if (value !== ',') setTag(value)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      if (!tag) return
      if (tags.includes(tag)) return setTag('')
      setTags([...tags, tag])
      setTag('')
    }

    if (e.key === 'Backspace') {
      const remainingTags = tags.filter((singleTag, index) => index !== tags.length - 1)
      if (tag) return
      setTags(remainingTags)
    }
  }

  const deleteTag = tag => {
    const remainingTags = tags.filter(singleTag => singleTag !== tag)
    setTags(remainingTags)
    tagRef.current.focus()
  }

  const renderTags = tags.map(singleTag => <Tag key={singleTag} text={singleTag} deleteTag={deleteTag} />)

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
    updateTags(tags)
  }, [tags])

  return (
    <div>
      <label ref={labelRef} htmlFor='tags' className='text-[#aaa] text-sm' onClick={handleOnFocus}>
        Tags
      </label>
      <div
        ref={divRef}
        className='w-full border border-[#aaa] min-h-[32px] rounded flex items-center flex-wrap gap-2 p-1'
        onKeyDown={handleKeyDown}
      >
        {renderTags}
        <input
          ref={tagRef}
          type='text'
          placeholder='enter tag'
          value={tag}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className='capitalize bg-transparent outline-none dark:text-white w-20'
        />
      </div>
    </div>
  )
}

const Tag = ({ text, deleteTag }) => {
  return (
    <span className='bg-white px-1 rounded capitalize text-sm flex items-center'>
      {text} <IoMdClose className='cursor-pointer' onClick={deleteTag.bind(null, text)} />
    </span>
  )
}

export default Tags
