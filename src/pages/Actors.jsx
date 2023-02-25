import React, { useState, useEffect } from 'react'
import ActorBox from '../components/admin/ActorBox'
import { getActors } from '../apis/actor'

const limit = 12

const Actors = () => {
  const [actors, setActors] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const handleNext = () => setCurrentPage(currentPage + 1)
  const handlePrev = () => {
    if (currentPage < 1) return
    setCurrentPage(currentPage - 1)
  }

  const fetchActors = async () => {
    console.log(currentPage)
    const { data, error } = await getActors(currentPage, limit)

    if (!data.actors.length) return setCurrentPage(currentPage - 1)
    setActors(data.actors)
  }

  useEffect(() => {
    fetchActors()
  }, [currentPage])

  const renderActors = () => actors.map(actor => <ActorBox key={actor.actorId} actor={actor} />)

  return (
    <div className='grid'>
      <div className='grid grid-cols-3 mt-4 gap-4'>{renderActors()}</div>
      <div className='flex gap-4 justify-self-end mt-4'>
        <button className='capitalize hover:underline' onClick={handlePrev}>
          prev
        </button>
        <button className='capitalize hover:underline' onClick={handleNext}>
          next
        </button>
      </div>
    </div>
  )
}

export default Actors
