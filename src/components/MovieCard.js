import { LazyLoadImage } from 'react-lazy-load-image-component'
import { faPlay, faPlus, faThumbsUp, faThumbsDown, faCheck, faHeart, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MovieCard = ({ movie }) => {
    const baseurl = 'https://image.tmdb.org/t/p/original/'

    if(!movie.backdrop_path) return <></>

  return (
    <div className={`flex-shrink-0 transition-transform transform  my-4 max-w-[300px] relative hover:scale-125 group/inner z-10 hover:z-20 rounded-md mb-16 hover:mb-0`}>
        <LazyLoadImage
            key={movie?.id}
            className={`m-1 group-hover/inner:h-1/2 transition-transform w-[228px]`}
            src={`${baseurl}${movie?.backdrop_path}`}
            alt={movie?.name}
        />
        <div className='hidden group-hover/inner:flex h-[1/2] bg-[#434343] z-20 w-full items-center'
              <FontAwesomeIcon className='m-2 rounded-full cursor-pointer p-2 bg-[#fff] ring-1 ring-white justify-center items-center' icon={faPlay} size='xl' style={{color: '#111'}}/>
              <FontAwesomeIcon className='m-2 rounded-full p-2 bg-[#111] ring-1 ring-white' icon={faPlus} />
              {/* <FontAwesomeIcon className='m-2 rounded-full p-2 bg-[#111] ring-1 ring-white' icon={faCheck} /> */}
              <FontAwesomeIcon className='m-1 rounded-full p-2' icon={faHeart} />
              {/* <FontAwesomeIcon className='m-1 rounded-full p-2' icon={faThumbsUp} />
              <FontAwesomeIcon className='m-1 rounded-full p-2' icon={faThumbsDown} /> */}
              <FontAwesomeIcon className='m-2 rounded-full p-2 float-right' icon={faChevronCircleDown} />
            <div className='block'>
              <p className='line-clamp-3'>
                {movie?.overview}
              </p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard