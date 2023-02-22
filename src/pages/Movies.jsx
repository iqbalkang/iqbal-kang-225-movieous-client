import React from 'react'
import { useState, useEffect } from 'react'
import { searchActor } from '../apis/actor'

const Movies = () => {
  const [input, setInput] = useState('')

  const handleChange = async e => {
    const { name, value } = e.target

    setInput(value)

    // const { data } = await searchActor(input)
    // console.log(data)
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      const { data } = await searchActor(input)
      console.log(data)
    }, 2000)

    return () => clearTimeout(timer)
  }, [input])

  return (
    <div>
      <input type='text' onChange={handleChange} value={input} className='text-black' />
    </div>
  )
}

export default Movies
