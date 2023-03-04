import React from 'react'

const LiveSearchLabel = ({ name, badge, count }) => {
  return (
    <label
      htmlFor='director'
      className='text-[#aaa] capitalize text-sm cursor-pointer peer-focus:text-black dark:peer-focus:text-white self-start relative'
    >
      {name}
      <Badge visible={badge} count={count} />
    </label>
  )
}

const Badge = ({ visible, count }) => {
  if (!visible) return null
  return (
    <span className='bg-custom-yellow h-4 w-4 rounded-full text-xs text-black inline-flex items-center justify-center absolute bottom-2'>
      {count}
    </span>
  )
}

export default LiveSearchLabel
