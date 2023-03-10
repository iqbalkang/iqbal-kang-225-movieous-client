import React from 'react'

const UpNext = ({ upNextMovies }) => {
  const renderUpNext = upNextMovies.map((movie, index) => <UpNextMovie key={index} {...movie} />)

  return (
    <div className='flex flex-col h-full'>
      <h2 className='h-[30px] font-bold'>Up Next</h2>
      <div className='gap-2 h-[calc(570px-30px)] overflow-y-scroll space-y-2'>{renderUpNext}</div>
    </div>
  )
}

export default UpNext

const UpNextMovie = ({ poster, title }) => {
  return <img src={poster} alt={title} />
}
