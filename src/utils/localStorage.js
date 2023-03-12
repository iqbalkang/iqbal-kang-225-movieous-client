const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const removeLocalStorage = key => {
  localStorage.removeItem(key)
}

const getLocalStorage = key => {
  let data = localStorage.getItem(key)

  return (data = data ? JSON.parse(data) : null)
}

export { setLocalStorage, getLocalStorage, removeLocalStorage }
