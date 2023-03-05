import React from 'react'
import Label from './Label'

const LiveSearchLabel = ({ name, badge, count }) => {
  return (
    <Label htmlFor={name} className='relative'>
      {name} <Badge visible={badge} count={count} />
    </Label>
  )
}

const badgeSpanStyles =
  'bg-accent text-white dark:text-black dark:bg-custom-yellow h-4 w-4 rounded-full text-xs text-black inline-flex items-center justify-center absolute bottom-2'

const Badge = ({ visible, count }) => {
  if (!visible) return null
  return <span className={badgeSpanStyles}>{count}</span>
}

export default LiveSearchLabel
