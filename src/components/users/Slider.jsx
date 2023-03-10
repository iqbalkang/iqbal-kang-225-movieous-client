// import React, { useState, useEffect, useRef } from 'react'
// import { getLatestMovies } from '../../apis/movie'
// import { ImNext, ImPrevious } from 'react-icons/im'
// import { Link } from 'react-router-dom'

// const Slider = () => {
//   const divRef = useRef()

//   const [movies, setMovies] = useState([])
//   const [index, setIndex] = useState(1)
//   const [visibilty, setVisibility] = useState(true)
//   const [upNextMovies, setUpNextMovies] = useState([])

//   const nextUpNext = array => {
//     const copiedState = [...array]
//     const updatedState = copiedState.slice(1)
//     setUpNextMovies([...updatedState, array[0]])
//   }

//   const prevUpNext = array => {
//     const copiedState = [...array]
//     copiedState.pop()
//     setUpNextMovies([array[array.length - 1], ...copiedState])
//   }

//   const fetchLatestMovies = async () => {
//     const { data, error } = await getLatestMovies()
//     const result = data.movies
//     const temp = [result[result.length - 1], ...result, result[0]]
//     setMovies(temp)
//     nextUpNext(result)
//   }

//   const handleNextSlide = () => {
//     divRef.current.classList.add('duration-500')
//     setIndex(prevIndex => prevIndex + 1)

//     nextUpNext(upNextMovies)
//   }

//   const handlePrevSlide = () => {
//     divRef.current.classList.add('duration-500')
//     setIndex(prevIndex => prevIndex - 1)

//     prevUpNext(upNextMovies)
//   }

//   const handleTransitionEnd = () => {
//     if (index === movies.length - 1) {
//       divRef.current.classList.remove('duration-500')
//       setIndex(1)
//     }

//     if (index === 0) {
//       divRef.current.classList.remove('duration-500')
//       setIndex(movies.length - 2)
//     }
//   }

//   let sliderInterval

//   const startSlider = () => {
//     sliderInterval = setInterval(() => {
//       handleNextSlide()
//     }, 1500)
//   }

//   const pauseSlider = () => {
//     clearInterval(sliderInterval)
//   }

//   const handleOnVisibilityChange = () => {
//     const visibilty = document.visibilityState
//     if (visibilty === 'hidden') setVisibility(false)
//     if (visibilty === 'visible') setVisibility(true)
//   }

//   const moviesLength = movies.length
//   const upNextMoviesLength = upNextMovies.length
//   useEffect(() => {
//     if (visibilty && moviesLength && upNextMoviesLength) startSlider()
//     else pauseSlider()
//     document.addEventListener('visibilitychange', handleOnVisibilityChange)
//     return () => {
//       pauseSlider()
//       document.removeEventListener('visibilitychange', handleOnVisibilityChange)
//     }
//   }, [index, visibilty, moviesLength, upNextMoviesLength])

//   useEffect(() => {
//     fetchLatestMovies()
//   }, [])

//   const renderMovies = movies.map((movie, index) => <Slide key={index} {...movie} />)

//   const renderUpNext = upNextMovies.map((movie, index) => <UpNext key={index} {...movie} />)

//   const moveToLeft = {
//     transform: `translateX(-${index * 100}%)`,
//   }

//   return (
//     <div className='grid grid-cols-[4fr,1fr] gap-2 h-[570px]'>
//       <div className='overflow-hidden relative'>
//         <div ref={divRef} onTransitionEnd={handleTransitionEnd} className='flex duration-500' style={moveToLeft}>
//           {renderMovies}
//         </div>
//         <SliderController onNextClick={handleNextSlide} onPrevClick={handlePrevSlide} />
//       </div>
//       <div className='flex flex-col h-full'>
//         <h2 className='h-[30px] font-bold'>Up Next</h2>
//         <div className='gap-2 h-[calc(570px-30px)] overflow-y-scroll space-y-2'>{renderUpNext}</div>
//       </div>
//     </div>
//   )
// }

// const Slide = ({ poster, movieId, title }) => {
//   const slideTitleClasses =
//     'w-full text-accent dark:text-custom-yellow font-bold text-2xl absolute bottom-0 bg-gradient-to-r from-slate-100 dark:from-black p-4'
//   return (
//     <Link to={`movie/${movieId}`} className='relative flex-shrink-0 w-full'>
//       <img src={poster} alt={title} className='aspect-video w-full' />
//       <h3 className={slideTitleClasses}>{title}</h3>
//     </Link>
//   )
// }

// const SliderController = ({ onNextClick, onPrevClick }) => {
//   const buttonCommonClasses = 'absolute top-1/2 text-3xl px-2 text-white '
//   return (
//     <>
//       <button onClick={onPrevClick} className={buttonCommonClasses}>
//         <ImPrevious />
//       </button>
//       <button onClick={onNextClick} className={buttonCommonClasses + 'right-0'}>
//         <ImNext />
//       </button>
//     </>
//   )
// }

// const UpNext = ({ poster, title }) => {
//   return <img src={poster} alt={title} />
// }

// export default Slider

///////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect, useRef } from 'react'
import { getLatestMovies } from '../../apis/movie'
import CurrentSlide from './CurrentSlide'
import UpNext from './UpNext'

const Slider = () => {
  const divRef = useRef()

  const [movies, setMovies] = useState([])
  const [index, setIndex] = useState(1)
  const [visibilty, setVisibility] = useState(true)
  const [upNextMovies, setUpNextMovies] = useState([])

  const nextUpNext = array => {
    const copiedState = [...array]
    const updatedState = copiedState.slice(1)
    setUpNextMovies([...updatedState, array[0]])
  }

  const prevUpNext = array => {
    const copiedState = [...array]
    copiedState.pop()
    setUpNextMovies([array[array.length - 1], ...copiedState])
  }

  const fetchLatestMovies = async () => {
    const { data, error } = await getLatestMovies()
    const result = data.movies
    const temp = [result[result.length - 1], ...result, result[0]]
    setMovies(temp)
    nextUpNext(result)
  }

  const handleNextSlide = () => {
    divRef.current.classList.add('duration-500')
    setIndex(prevIndex => prevIndex + 1)

    nextUpNext(upNextMovies)
  }

  const handlePrevSlide = () => {
    divRef.current.classList.add('duration-500')
    setIndex(prevIndex => prevIndex - 1)

    prevUpNext(upNextMovies)
  }

  const handleTransitionEnd = () => {
    if (index === movies.length - 1) {
      divRef.current.classList.remove('duration-500')
      setIndex(1)
    }

    if (index === 0) {
      divRef.current.classList.remove('duration-500')
      setIndex(movies.length - 2)
    }
  }

  let sliderInterval

  const startSlider = () => {
    sliderInterval = setInterval(() => {
      handleNextSlide()
    }, 3000)
  }

  const pauseSlider = () => {
    clearInterval(sliderInterval)
  }

  const handleOnVisibilityChange = () => {
    const visibilty = document.visibilityState
    if (visibilty === 'hidden') setVisibility(false)
    if (visibilty === 'visible') setVisibility(true)
  }

  const moviesLength = movies.length
  const upNextMoviesLength = upNextMovies.length
  useEffect(() => {
    if (visibilty && moviesLength && upNextMoviesLength) startSlider()
    else pauseSlider()
    document.addEventListener('visibilitychange', handleOnVisibilityChange)
    return () => {
      pauseSlider()
      document.removeEventListener('visibilitychange', handleOnVisibilityChange)
    }
  }, [index, visibilty, moviesLength, upNextMoviesLength])

  useEffect(() => {
    fetchLatestMovies()
  }, [])

  return (
    <div className='grid grid-cols-[4fr,1fr] gap-2 h-[570px]'>
      <CurrentSlide
        ref={divRef}
        movies={movies}
        index={index}
        handleNextSlide={handleNextSlide}
        handlePrevSlide={handlePrevSlide}
        handleTransitionEnd={handleTransitionEnd}
      />

      <UpNext upNextMovies={upNextMovies} />
    </div>
  )
}

export default Slider
