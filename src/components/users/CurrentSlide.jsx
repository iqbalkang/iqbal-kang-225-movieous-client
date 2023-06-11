import React from 'react';
import { ImNext, ImPrevious } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

const CurrentSlide = forwardRef((props, ref) => {
  const { movies, index, handleTransitionEnd, handleNextSlide, handlePrevSlide } = props;

  const renderMovies = movies.map((movie, index) => <Slide key={index} {...movie} />);

  const moveToLeft = {
    transform: `translateX(-${index * 100}%)`,
  };

  return (
    <div className='overflow-hidden relative'>
      <div ref={ref} onTransitionEnd={handleTransitionEnd} className='flex duration-500' style={moveToLeft}>
        {renderMovies}
      </div>
      <SliderController onNextClick={handleNextSlide} onPrevClick={handlePrevSlide} />
    </div>
  );
});

const Slide = ({ poster, movieId, title }) => {
  const slideTitleClasses =
    'w-full capitalize text-accent dark:text-custom-yellow font-bold text-2xl absolute bottom-0 bg-gradient-to-r from-slate-100 dark:from-black p-4';
  return (
    <Link to={`movie/${movieId}`} className='relative flex-shrink-0 w-full'>
      <img src={poster} alt={title} className='aspect-video w-full' />
      <h3 className={slideTitleClasses}>{title}</h3>
    </Link>
  );
};

const SliderController = ({ onNextClick, onPrevClick }) => {
  const buttonCommonClasses = 'absolute top-1/2 text-3xl px-2 text-white ';
  return (
    <>
      <button onClick={onPrevClick} className={buttonCommonClasses}>
        <ImPrevious />
      </button>
      <button onClick={onNextClick} className={buttonCommonClasses + 'right-0'}>
        <ImNext />
      </button>
    </>
  );
};

export default CurrentSlide;
