import React from 'react'
import Box from './Box'

const AppInfoBox = ({ title, value }) => {
  return (
    <Box>
      <h1 className='text-lg font-bold capitalize'>{title}</h1>
      <p>{value}</p>
    </Box>
  )
}

export default AppInfoBox
