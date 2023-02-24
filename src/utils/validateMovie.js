const validateMovie = movieInfo => {
  const { title, storyLine, tags, director, writers, releaseDate, status, genre, cast, language } = movieInfo

  if (!title) return { error: 'Please enter movie title' }
  if (!storyLine) return { error: 'Please enter movie storyline' }
  if (!releaseDate) return { error: 'Please enter release data' }
  if (!status) return { error: 'Please enter movie status' }
  if (!language) return { error: 'Please enter movie language' }
  if (!tags.length) return { error: 'Please enter atleast one tag' }
  if (!cast.length) return { error: 'Please enter the cast' }
  if (!genre.length) return { error: 'Please select genre of the movie' }
  if (!director) return { error: 'Please select the director' }

  return { error: null }
}

export default validateMovie
