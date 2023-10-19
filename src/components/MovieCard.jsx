import { LazyLoadImage } from 'react-lazy-load-image-component'
import { faCirclePlay, faCirclePlus, faThumbsUp, faThumbsDown, faCircleCheck, faHeart, faChevronCircleDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import genres from '../genres'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addToNowWatching, removeFromNowWatching, selectDisLikes, selectLikes, selectMyList, selectNowWatching } from '../features/userSlice'
import { selectCurrentProfile } from '../features/userSlice'
import { useDispatch } from 'react-redux'
import { addToDislikes, addToLikes, addToMyList } from '../features/userSlice'
import { useUpdateLikesMutation, useUpdateMyListMutation, useUpdateNowWatchingMutation, useGetCurrentEpisodeMutation } from '../features/profileApi'


const MovieCard = ({ movie, type, continueWatching }) => {

    const baseurl = 'https://image.tmdb.org/t/p/original/'
    const navigate = useNavigate()
    const profile = useSelector(selectCurrentProfile)
    var [liked, setLiked] = useState(useSelector(selectLikes)?.includes(movie?.id))
    var [disliked, setDisliked] = useState(useSelector(selectDisLikes)?.includes(movie?.id))
    var [myList, setMyList] = useState(useSelector(selectMyList)?.includes(movie?.id))
    var [nowWatching, setNowWatching] = useState(useSelector(selectNowWatching)?.includes(movie?.id))
    const [updateLikesApi] = useUpdateLikesMutation()
    const [updateMyListApi] = useUpdateMyListMutation()
    const [updateNowWatchingApi] = useUpdateNowWatchingMutation()
    const [currentEpisodeApi] = useGetCurrentEpisodeMutation()

    const dispatch = useDispatch()

    const optimisticLike = (rating)=>{
      if (rating === 1){
        setLiked((prev)=>!prev)
        dispatch(addToLikes({ showId: movie?.id }))
        if (disliked){
          setDisliked((prev)=>!prev)
          dispatch(addToDislikes({ showId: movie?.id }))
        }
      } else {
        setDisliked((prev)=>!prev)
        dispatch(addToDislikes({ showId: movie?.id }))
        if (liked){
          setLiked((prev)=>!prev)
          dispatch(addToLikes({ showId: movie?.id }))
        }
      }
    }

    const rate = (rating)=>{
      console.log("Rate");
      optimisticLike(rating)
      updateLikesApi({profileId: profile?.id, showId: movie?.id, type:type, rating: rating})
        .unwrap()
        .then((res)=>{
          console.log(res);
        })
        .catch((err)=>{
          console.error(err)
          optimisticLike(rating)
        })
    }

    const onPlay = (e)=>{
      currentEpisodeApi({profileId: profile?.id, showId: movie?.id, type: type})
        .unwrap()
        .then((res)=>{
          e.preventDefault()
          dispatch(addToNowWatching({ showId: movie?.id }))
          navigate(`/watch/${type}/${movie?.id}?tracking_id=${res?.id}`)
        })
        .catch((err)=>{console.error(err)})
      
    }

    const updateNowWatching = (e)=>{
      e.preventDefault()
      setNowWatching((prev)=>!prev)
      dispatch(removeFromNowWatching({ showId: movie?.id }))
      updateNowWatchingApi({profileId: profile?.id, showId: movie?.id, type: type})
            .unwrap()
            .then((res)=>{
              console.log(res);
            })
            .catch((err)=>{
              dispatch(addToNowWatching({ showId: movie?.id }))
              setNowWatching((prev)=>!prev)
              console.error(err)
            })
    }

    const updateMylist = (e)=>{
      e.preventDefault()
      setMyList((prev)=>!prev)
      dispatch(addToMyList({ showId: movie?.id }))
      updateMyListApi({profileId: profile?.id, showId: movie?.id, type: type})
            .unwrap()
            .then((res)=>{
              console.log(res);
            })
            .catch((err)=>{
              dispatch(addToMyList({ showId: movie?.id }))
              setMyList((prev)=>!prev)
              console.error(err)
            })
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
        { continueWatching && (
          <div className='hidden group-hover/inner:flex absolute top-2 right-2 z-2000'>
              <FontAwesomeIcon 
                className='cursor-pointer' 
                icon={faCircleXmark} 
                size={'xl'} 
                onClick={updateNowWatching}
              />
          </div>
        
        ) }
        <div className='hidden absolute top-[20px] group-hover/inner:block inset-0 z-1000 p-2 bg-gradient-to-b from-transparent to-[#111] items-center'>
        <div className='block p-2 text-sm mt-2 line-clamp-1'>
              <p className='line-clamp-1'>{movie?.title || movie?.name || movie?.original_name} 
              </p>

              <p className='text-[8px] line-clamp-1'>
                Genres: { movie?.genres ? (movie?.genres.map((genre)=>genre.name).join(', ')) : (movie?.genre_ids?.map((genre_id)=>(genres.filter((genre)=>(genre.id === genre_id))[0]?.name)).join(', ')) }
              </p>
            </div>
            <div className='flex px-2 items-center justify-around'>
              <div className='flex justify-between w-[70%] items-center'>
                <FontAwesomeIcon 
                  className='cursor-pointer' 
                  icon={faCirclePlay} 
                  size={'xl'} 
                  onClick={onPlay}
                />

                { myList ? (
                  <FontAwesomeIcon 
                    className='cursor-pointer' 
                    icon={faCircleCheck} 
                    size='xl' 
                    onClick={updateMylist}
                  /> ) : ( 
                  <FontAwesomeIcon 
                    className='cursor-pointer' 
                    icon={faCirclePlus} 
                    size='xl' 
                    onClick={updateMylist}
                  /> ) }

                <FontAwesomeIcon 
                  className='cursor-pointer' 
                  icon={faThumbsUp} 
                  size={'xl'}
                  onClick={()=>rate(1)}
                  style={{ color: liked && '#e50914' }}
                />
                <FontAwesomeIcon 
                  className='cursor-pointer' 
                  icon={faThumbsDown} 
                  size={'xl'}
                  onClick={()=>rate(-1)}
                  style={{ color: disliked && '#e50914' }}
                />
              </div>
              <Link to={`/details/${type}/${movie?.id}`}>
                <FontAwesomeIcon 
                  className='cursor-pointer' 
                  icon={faChevronCircleDown} 
                  size={'xl'} 
                />
              </Link>
            </div>
        </div>
    </div>
  )
}

export default MovieCard