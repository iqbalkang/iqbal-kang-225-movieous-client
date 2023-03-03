import React, { useState, useEffect } from 'react'
import ActorBox from '../components/admin/ActorBox'
import { getActors, searchActor } from '../apis/actor'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import ActorForm from '../components/ActorForm'
import Search from '../components/Search'
import useNotification from '../hooks/useNotification'
import UpdateActorModal from '../components/modals/UpdateActorModal'

const limit = 12

const Actors = () => {
  const { renderNotification } = useNotification()

  const [actors, setActors] = useState([])
  const [searchedActors, setSearchedActors] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [actorModal, setActorModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)

  const handleEdit = profile => {
    setActorModal(prevState => !prevState)
    setSelectedProfile(profile)
  }

  const handleEditSubmit = profile => {
    const updatedActors = actors.map(actor => {
      if (actor.actorId === profile.actorId) return profile
      else return actor
    })
    setActors([...updatedActors])
  }

  const toggleActorModal = () => setActorModal(prevState => !prevState)

  const handleNext = () => setCurrentPage(currentPage + 1)

  const handlePrev = () => {
    if (currentPage < 1) return
    setCurrentPage(currentPage - 1)
  }

  const fetchActors = async () => {
    const { data, error } = await getActors(currentPage, limit)

    if (!data.actors.length) return setCurrentPage(currentPage - 1)
    setActors(data.actors)
  }

  const handleSearchSubmit = async value => {
    const { data, error } = await searchActor(value)
    if (!data.actors.length) return renderNotification('warning', 'No record was found')
    setSearchedActors(data.actors)
  }

  const handleSearchReset = () => {
    setSearchedActors([])
  }

  useEffect(() => {
    fetchActors()
  }, [currentPage])

  let renderActors
  if (searchedActors.length) {
    renderActors = () =>
      searchedActors.map(actor => <ActorBox handleEdit={handleEdit} key={actor.actorId} actor={actor} />)
  } else {
    renderActors = () => actors.map(actor => <ActorBox handleEdit={handleEdit} key={actor.actorId} actor={actor} />)
  }

  return (
    <div className='grid'>
      <div className='justify-self-end mt-4'>
        <Search placeholder='search actor' onSubmit={handleSearchSubmit} onReset={handleSearchReset} />
      </div>
      <div className='grid lg:grid-cols-2 xl:grid-cols-3 mt-4 gap-4'>{renderActors()}</div>
      <Pagination handleNext={handleNext} handlePrev={handlePrev} />

      <UpdateActorModal
        visible={actorModal}
        closeModal={toggleActorModal}
        selectedProfile={selectedProfile}
        handleEditSubmit={handleEditSubmit}
      />
    </div>
  )
}

export default Actors
