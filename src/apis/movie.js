import customFetch from '../utils/axios'

const postTrailer = async (trailer, setUploadProgress) => {
  try {
    const { data } = await customFetch.post(`/movie/upload-trailer`, trailer, {
      onUploadProgress: ({ loaded, total }) => {
        setUploadProgress(Math.floor((loaded / total) * 100))
      },
    })
    return { data }
  } catch (error) {
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const postMovie = async movieInfo => {
  try {
    const { data } = await customFetch.post(`/movie`, movieInfo)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const updateMovie = async (id, movieInfo) => {
  console.log(id)
  try {
    const { data } = await customFetch.patch(`/movie/${id}`, movieInfo)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data.message }
    return { error }
  }
}

const getMovies = async (page, limit) => {
  try {
    const { data } = await customFetch.get(`/movie?page=${page}&limit=${limit}`)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const getMovie = async id => {
  try {
    const { data } = await customFetch.get(`/movie/${id}`)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const searchMovie = async title => {
  try {
    const { data } = await customFetch.get(`/movie/search?title=${title}`)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const deleteMovie = async id => {
  try {
    const { data } = await customFetch.delete(`/movie/${id}`)
    console.log(data)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const getTopRated = async type => {
  let url = 'movie/top-rated'
  if (type) url = `${url}?type=${type}`
  try {
    const { data } = await customFetch.get(url)
    // console.log(data)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const getLatestMovies = async type => {
  try {
    const { data } = await customFetch.get(`movie/lastest-uploads`)
    // console.log(data)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const getSingleMovie = async id => {
  try {
    const { data } = await customFetch.get(`movie/single-movie/${id}`)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

const getRelatedMovies = async id => {
  try {
    const { data } = await customFetch.get(`movie/related-movies/${id}`)
    return { data }
  } catch (error) {
    console.log(error)
    const { response } = error
    if (response?.data) return { error: response.data }
    return { error }
  }
}

export {
  postTrailer,
  postMovie,
  getMovies,
  getMovie,
  updateMovie,
  searchMovie,
  deleteMovie,
  getTopRated,
  getLatestMovies,
  getSingleMovie,
  getRelatedMovies,
}
