import React from 'react'

const Select = ({ label, options, value, onChange, name }) => {
  return (
    <div>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`${
          value ? 'dark:text-white' : 'dark:text-[#aaa]'
        } bg-transparent capitalize outline-none cursor-pointer border border-[#aaa] rounded p-1`}
      >
        <option value=''>{label}</option>
        {options.map(option => {
          const { title, value } = option
          return (
            <option key={value} value={value}>
              {title}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
