import customFetch from '../utils/axios'
import { getLocalStorage } from '../utils/localStorage'

const getAppInfo = async () => {
  const { token } = getLocalStorage('user')

  try {
    const { data } = await customFetch.get(`admin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const getMostRated = async () => {
  const { token } = getLocalStorage('user')

  try {
    const { data } = await customFetch.get(`admin/most-rated`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

export { getAppInfo, getMostRated }
