import { LazyLoadImage } from 'react-lazy-load-image-component'
import { faCirclePlay, faPlus, faThumbsUp, faThumbsDown, faCheck, faHeart, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import genres from '../genres'

const LargeMovieCard = ({ movie }) => {
    const baseurl = 'https://image.tmdb.org/t/p/original/'

    if(!movie.backdrop_path) return <></>

  return (
    <div className={`flex-shrink-0 mx-1 my-4 w-[228px] relative z-10 rounded-lg`}>
        <LazyLoadImage
            key={movie?.id}
            className={`object-contain`}
            src={`${baseurl}${movie?.backdrop_path}`}
            alt={movie?.name}
        />
        <div className='inset-0 px-4 py-2 h-1/2 bg-[#434343] items-center'>
            <div className='flex items-center justify-between'>
              <FontAwesomeIcon className='cursor-pointer justify-center items-center' icon={faCirclePlay} size='2xl'/>
              <FontAwesomeIcon className='rounded-full p-1 bg-[#111] ring-1 ring-white' icon={faPlus} />
              {/* <FontAwesomeIcon className='m-2 rounded-full p-2 bg-[#111] ring-1 ring-white' icon={faCheck} /> */}
              <FontAwesomeIcon className='rounded-full p-2' icon={faHeart} />
              {/* <FontAwesomeIcon className='m-1 rounded-full p-2' icon={faThumbsUp} />
              <FontAwesomeIcon className='m-1 rounded-full p-2' icon={faThumbsDown} /> */}
              <FontAwesomeIcon className='rounded-full p-2 float-right' icon={faChevronCircleDown} />
            </div>
              
            <div className='block text-md mt-2 line-clamp-2'>
              {movie?.title || movie?.name || movie?.original_name}
              <p className='line-clamp-2 text-[8px]'>
                {movie?.overview}
              </p>
              <p className='text-[8px]'>
                Genres: {movie?.genre_ids.map((genre_id)=>(genres.filter((genre)=>(genre.id === genre_id))[0].name)).join(', ')}
              </p>
            </div>
        </div>
    </div>
  )
}

export default LargeMovieCard