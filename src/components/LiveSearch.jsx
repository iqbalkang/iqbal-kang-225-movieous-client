import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import Modal from './Modal'

const LiveSearch = ({ onClick, placeholder, results, name, writers, toggleWritersModal }) => {
  const resultRef = useRef()
  const inputRef = useRef()
  const [resultsVisible, setResultsVisible] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [input, setInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const handleOnFocus = () => setResultsVisible(true)
  const handleOnBlur = e => {
    setTimeout(() => {
      setResultsVisible(false)
    }, [100])
  }

  const handleOnClick = result => {
    onClick(result)
    if (name === 'writers') return
    setInput(result.name)
    // setResultsVisible(false)
  }

  const handleOnChange = e => {
    const { value } = e.target

    setInput(value)
  }

  const handleOnKeyDown = ({ key }) => {
    let nextCount
    const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape']
    if (!keys.includes(key)) return

    if (key === keys[0]) nextCount = (focusedIndex + 1) % results.length
    if (key === keys[1]) nextCount = (focusedIndex + results.length - 1) % results.length

    setFocusedIndex(nextCount)

    if (key === keys[2]) {
      handleOnClick(results[focusedIndex])
      setFocusedIndex(-1)
      inputRef.current.blur()
      setResultsVisible(false)
    }

    if (key === keys[3]) {
      setFocusedIndex(-1)
      inputRef.current.blur()
      setResultsVisible(false)
    }
  }

  const renderResultsFields = results.map((result, index) => {
    return (
      <ResultField
        key={index}
        result={result}
        onClick={handleOnClick}
        index={index}
        focusedIndex={focusedIndex}
        resultRef={resultRef}
      />
    )
  })

  const handleButtonClick = () => {
    toggleWritersModal()
  }

  return (
    <div className='relative'>
      {name === 'writers' && (
        <button
          className='absolute right-0 dark:text-white capitalize text-xs'
          type='button'
          onClick={handleButtonClick}
        >
          view all
        </button>
      )}
      <div className='flex flex-col-reverse'>
        <input
          ref={inputRef}
          type='text'
          name={name}
          id={name}
          value={input}
          onChange={handleOnChange}
          placeholder={placeholder}
          className='capitalize w-full bg-transparent outline-none rounded border-[#aaa] border-[1px] dark:focus:border-white focus:border-black peer dark:text-white px-1'
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onKeyDown={handleOnKeyDown}
        />
        <label
          htmlFor={name}
          className='text-[#aaa] capitalize text-sm cursor-pointer peer-focus:text-black dark:peer-focus:text-white self-start relative'
        >
          {name}
          {name === 'writers' && (
            <span className='bg-custom-yellow h-4 w-4 rounded-full text-xs text-black inline-flex items-center justify-center absolute bottom-2'>
              {writers.length}
            </span>
          )}
        </label>
      </div>

      {resultsVisible && <ResultsContainer> {renderResultsFields} </ResultsContainer>}
    </div>
  )
}

const ResultsContainer = ({ children }) => {
  return (
    <div className='absolute z-20 left-0 right-0 mt-2 h-48 rounded overflow-hidden overflow-y-scroll  shadow-md bg-[#aaa] dark:bg-background dark:text-white'>
      {children}
    </div>
  )
}

const ResultField = ({ result, onClick, index, focusedIndex, resultRef }) => {
  useEffect(() => {
    resultRef.current?.scrollIntoView({ block: 'center' })
  }, [focusedIndex])
  const { avatar, name } = result
  return (
    <div
      ref={index === focusedIndex ? resultRef : null}
      className={`${
        index === focusedIndex ? 'bg-white dark:bg-[#aaa] ' : ''
      } flex items-center capitalize gap-3 p-1 hover:bg-white dark:hover:bg-[#aaa] cursor-pointer`}
      onClick={onClick.bind(null, result)}
    >
      <img src={avatar} alt='' className='w-14 h-14 object-cover rounded-full' />
      <p>{name}</p>
    </div>
  )
}

export default LiveSearch
