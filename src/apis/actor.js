import customFetch from '../utils/axios'

const postActor = async actorInfo => {
  try {
    const { data } = await customFetch.post(`/actor`, actorInfo)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const searchActor = async actor => {
  try {
    const { data } = await customFetch.get(`/actor/search?name=${actor}`)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

export { postActor, searchActor }
