import customFetch from '../utils/axios'
import { getLocalStorage } from '../utils/localStorage'

const postReview = async (id, review) => {
  const { token } = getLocalStorage('user')

  try {
    const { data } = await customFetch.post(`review/${id}`, review, {
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

const getReviews = async (id, review) => {
  try {
    const { data } = await customFetch.get(`review/${id}`)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const updateReview = async (id, review) => {
  const { token } = getLocalStorage('user')

  try {
    const { data } = await customFetch.patch(`review/${id}`, review, {
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

const deleteReview = async (id, review) => {
  const { token } = getLocalStorage('user')

  try {
    const { data } = await customFetch.delete(`review/${id}`, {
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

const getOwnerReview = async id => {
  const { token } = getLocalStorage('user')

  try {
    const { data } = await customFetch.get(`review/owner/${id}`, {
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

export { postReview, getReviews, getOwnerReview, updateReview, deleteReview }
