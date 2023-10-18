import { LazyLoadImage } from 'react-lazy-load-image-component'
import { faCirclePlay, faCirclePlus, faThumbsUp, faThumbsDown, faCheck, faHeart, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import genres from '../genres'
import { useState } from 'react'
import ShowDetails from './ShowDetails'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLikes, selectMyList, selectNowWatching } from '../features/userSlice'
import { selectCurrentProfile } from '../features/userSlice'
import { useGetCurrentEpisodeMutation } from '../features/profileApi'


const MovieCard = ({ movie, type }) => {

    const baseurl = 'https://image.tmdb.org/t/p/original/'
    const navigate = useNavigate()
    const profile = useSelector(selectCurrentProfile)
    const liked = useSelector(selectLikes)?.includes(movie)
    const myList = useSelector(selectMyList)?.includes(movie)
    const nowWatching = useSelector(selectNowWatching)?.includes(movie)
    // const [getCurrentEpisodeQuery] = useGetCurrentEpisodeQuery()
    const [currentEpisodeApi] = useGetCurrentEpisodeMutation()
    const rate = (e)=>{

    }

    const onPlay = (e)=>{
      currentEpisodeApi({profileId: profile?.id, showId: movie?.id, type: 'tv'})
        .unwrap()
        .then((res)=>{
          e.preventDefault()
          navigate(`/watch/${'tv'}/${movie?.id}?tracking_id=${res?.id}`)
        })
        .catch((err)=>{console.error(err)})
      
    }

    const mylist = (e)=>{

    }

    if(!type) type = movie?.media_type

    if (!type) type = movie?.type
  

    if(!movie?.backdrop_path) return <></>

  return (
    <div className={`relative max-h-[178px] mx-1 max-w-[228px] flex-shrink-0 w-[228px] transition-transform transform group/inner z-0 hover:scale-125 hover:z-50 rounded-lg mb-26 mt-6 overflow-hidden hover:mb-0 hover:shadow-xl`}>
        <LazyLoadImage
            key={movie?.id}
            className={`relative object-cover z-0 rounded-lg transition-transform`}
            src={`${baseurl}${movie?.backdrop_path}`}
            alt={movie?.name}
        />
        <div className='hidden absolute top-[20px] group-hover/inner:block inset-0 z-1000 p-2 bg-gradient-to-b from-transparent to-[#111] items-center'>
        <div className='block p-2 text-sm mt-2 line-clamp-1'>
              <p className='line-clamp-1'>{movie?.title || movie?.name || movie?.original_name}</p>

              <p className='text-[8px] line-clamp-1'>
                Genres: { movie?.genres ? (movie?.genres.map((genre)=>genre.name).join(', ')) : (movie?.genre_ids?.map((genre_id)=>(genres.filter((genre)=>(genre.id === genre_id))[0]?.name)).join(', ')) }
              </p>
            </div>
            <div className='flex px-2 items-center justify-around'>
              <div className='flex justify-between w-[50%] items-center'>
                <FontAwesomeIcon className='cursor-pointer' icon={faCirclePlay} size={'xl'} onClick={onPlay}/>
                <FontAwesomeIcon className='cursor-pointer' icon={faCirclePlus} size='xl'/>
                <FontAwesomeIcon className='cursor-pointer' icon={faHeart} size={'xl'}/>
              </div>
              <Link to={`/details/${type}/${movie?.id}`}>
              <FontAwesomeIcon className='cursor-pointer' icon={faChevronCircleDown} size={'xl'} />
              </Link>
            </div>
        </div>
    </div>
  )
}

export default MovieCard