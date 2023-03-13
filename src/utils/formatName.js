const formattName = (name = '') => {
  if (name.length > 12) return name.slice(0, 15) + '...'
  else return name
}

export { formattName }
