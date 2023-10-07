import { LazyLoadImage } from 'react-lazy-load-image-component'
import { faCirclePlay, faPlus, faThumbsUp, faThumbsDown, faCheck, faHeart, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import genres from '../genres'


const MovieCard = ({ movie }) => {
    const baseurl = 'https://image.tmdb.org/t/p/original/'

    if(!movie.backdrop_path) return <></>

  return (
    <div className={`relative overflow-y-visible max-w-[228px] flex-shrink-0 w-[228px] mx-1 transition-transform transform mt-6 group/inner z-0 hover:scale-125 hover:z-20 rounded-lg mb-20 hover:mb-0 overflow-visible hover:shadow-xl`} onClick={()=>console.log(movie)}>
        <LazyLoadImage
            key={movie?.id}
            className={`relative object-contain z-0 w-[228px] group-hover/inner:-translate-y-1/2 transition-transform`}
            src={`${baseurl}${movie?.backdrop_path}`}
            alt={movie?.name}
        />
        <div className='invisible top-0 group-hover/inner:visible z-0 group-hover/inner:z-20 group-hover/inner:-translate-y-2/3 px-4 py-2 bg-[#434343] items-center'>
            <div className='flex items-center justify-between'>
              <FontAwesomeIcon className='cursor-pointer justify-center items-center' icon={faCirclePlay} size='2xl'/>
              <FontAwesomeIcon className='rounded-full p-1 bg-[#111] ring-1 ring-white' icon={faPlus} />
              <FontAwesomeIcon className='rounded-full p-2' icon={faHeart} />
              <FontAwesomeIcon className='rounded-full p-2 float-right' icon={faChevronCircleDown} />
            </div>
              
            <div className='block text-sm mt-2'>
              {movie?.title || movie?.name || movie?.original_name}

              <p className='text-[8px]'>
                Genres: {movie?.genre_ids.map((genre_id)=>(genres.filter((genre)=>(genre.id === genre_id))[0].name)).join(', ')}
              </p>
            </div>
        </div>
    </div>
  )
}

export default MovieCard