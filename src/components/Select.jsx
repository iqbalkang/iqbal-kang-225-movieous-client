import React from 'react'

const Select = ({ options, value, onChange, name }) => {
  const selectStyles =
    'bg-transparent capitalize outline-none cursor-pointer border border-grayish rounded p-1 focus:border-black dark:focus:border-white '
  const renderSelectClasses = value ? 'toggle-text' : 'text-grayish'

  const renderOptions = options.map(option => <Option key={option.title} {...option} />)

  return (
    <div>
      <select name={name} id={name} value={value} onChange={onChange} className={selectStyles + renderSelectClasses}>
        <option value=''>{name}</option>
        {renderOptions}
      </select>
    </div>
  )
}

export default Select

const Option = ({ value, title }) => {
  return (
    <option key={value} value={value}>
      {title}
    </option>
  )
}
