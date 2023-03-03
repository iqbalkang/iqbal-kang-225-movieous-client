import React, { useRef, useEffect, useState } from 'react'
import { searchActor } from '../apis/actor'

const LiveSearch2 = ({ name, onClick, value, handleLiveSearchOnChange }) => {
  const resultRef = useRef()
  const inputRef = useRef()
  const [input, setInput] = useState('')
  const [results, setResults] = useState([])
  const [resultsVisible, setResultsVisible] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [modalVisible, setModalVisible] = useState(false)
  // const [firstRender, setFirstRender] = useState(true)

  const handleOnFocus = () => results.length && setResultsVisible(true)

  const handleOnBlur = () => setResultsVisible(false)

  // useEffect(() => {
  //   setInput('')
  // }, [resetInput])

  // console.log(results)

  // useEffect(() => {
  //   setInput(val)
  // }, [val])

  useEffect(() => {
    if (!input) {
      setResults([])
      setResultsVisible(false)
      return
    }

    const timer = setTimeout(async () => {
      const { data } = await searchActor(input)
      setResults(data.actors)
      if (!value) setResultsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [input])

  useEffect(() => {
    if (value) setInput(value)
  }, [value])

  const handleOnChange = e => {
    const { value } = e.target
    setInput(value)
  }

  const handleOnSelect = result => {
    // console.log(result)
    onClick(result)
    if (name === 'writers') return setInput('')
    setInput(result.name)
    setResultsVisible(false)
  }

  const handleOnKeyDown = ({ key }) => {
    let nextCount

    const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape']

    if (!keys.includes(key)) return
    if (!results.length) return

    if (key === keys[0]) nextCount = (focusedIndex + 1) % results.length
    if (key === keys[1]) nextCount = (focusedIndex + results.length - 1) % results.length

    setFocusedIndex(nextCount)

    if (key === keys[2]) {
      handleOnSelect(results[focusedIndex])
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

  const handleButtonClick = () => {
    // toggleWritersModal()
  }

  const renderResultsFields = results.map((result, index) => {
    return (
      <ResultCard
        key={index}
        result={result}
        onMouseDown={handleOnSelect}
        index={index}
        focusedIndex={focusedIndex}
        resultRef={resultRef}
      />
    )
  })

  return (
    // <div className='relative'>
    <>
      <input
        ref={inputRef}
        type='text'
        name={name}
        id={name}
        value={input}
        onChange={handleOnChange}
        placeholder='search profile 2'
        className='capitalize w-full bg-transparent outline-none rounded border-[#aaa] border-[1px] dark:focus:border-white focus:border-black peer dark:text-white px-1'
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
        autoComplete='off'
      />

      <ResultsContainer visible={resultsVisible}> {renderResultsFields} </ResultsContainer>
    </>
    // </div>
  )
}

export default LiveSearch2

const ResultsContainer = ({ visible, children }) => {
  if (!visible) return null

  return (
    <div className='absolute z-20 left-0 right-0 top-full mt-2 rounded overflow-hidden overflow-y-scroll max-h-60 shadow-md bg-[#aaa] dark:bg-background dark:text-white'>
      {children}
    </div>
  )
}

const ResultCard = ({ result, onMouseDown, index, focusedIndex, resultRef }) => {
  useEffect(() => {
    resultRef.current?.scrollIntoView({ block: 'center' })
  }, [focusedIndex])

  const { image, name } = result

  return (
    <div
      ref={index === focusedIndex ? resultRef : null}
      className={`${
        index === focusedIndex ? 'bg-white dark:bg-[#aaa] ' : ''
      } flex items-center capitalize gap-3 p-1 hover:bg-white dark:hover:bg-[#aaa] cursor-pointer`}
      onMouseDown={onMouseDown.bind(null, result)}
    >
      <img src={image} alt='' className='w-14 h-14 object-cover rounded-full' />
      <p>{name}</p>
    </div>
  )
}
