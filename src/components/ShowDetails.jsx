import { useParams } from "react-router-dom"
import Nav from "./Nav"
import { useGetShowDetailsQuery } from "../features/moviesApi"
import { faCirclePlay, faCirclePlus, faThumbsUp, faThumbsDown, faCircleCheck, faHeart, faChevronCircleDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
import Recommendations from "./Recommendations"
import { useState } from "react"
import TVSeasons from "./TVSeasons"
import { useSelector } from 'react-redux'
import { addToNowWatching, removeFromNowWatching, selectDisLikes, selectLikes, selectMyList, selectNowWatching } from '../features/userSlice'
import { selectCurrentProfile } from '../features/userSlice'
import { useDispatch } from 'react-redux'
import { addToDislikes, addToLikes, addToMyList } from '../features/userSlice'
import { useUpdateLikesMutation, useUpdateMyListMutation, useUpdateNowWatchingMutation, useGetCurrentEpisodeMutation } from '../features/profileApi'

const ShowDetails = () => {
  const baseurl = 'https://image.tmdb.org/t/p/original/'

  const { type, id:showId } = useParams()
  const { data: show } = useGetShowDetailsQuery({type, id: showId})
  const navigate = useNavigate()
  const [season, setSeason] = useState(1)

  const profile = useSelector(selectCurrentProfile)
  var [liked, setLiked] = useState(useSelector(selectLikes)?.includes(show?.id))
  var [disliked, setDisliked] = useState(useSelector(selectDisLikes)?.includes(show?.id))
  var [myList, setMyList] = useState(useSelector(selectMyList)?.includes(show?.id))
  var [nowWatching, setNowWatching] = useState(useSelector(selectNowWatching)?.includes(show?.id))
  const [updateLikesApi] = useUpdateLikesMutation()
  const [updateMyListApi] = useUpdateMyListMutation()
  const [updateNowWatchingApi] = useUpdateNowWatchingMutation()
  const [currentEpisodeApi] = useGetCurrentEpisodeMutation()

  const dispatch = useDispatch()

  const optimisticLike = (rating)=>{
    if (rating === 1){
      setLiked((prev)=>!prev)
      dispatch(addToLikes(show?.id))
      if (disliked){
        setDisliked((prev)=>!prev)
        dispatch(addToDislikes(show?.id))
      }
    } else {
      setDisliked((prev)=>!prev)
      dispatch(addToDislikes(show?.id))
      if (liked){
        setLiked((prev)=>!prev)
        dispatch(addToLikes(show?.id))
      }
    }
  }

  const rate = (rating)=>{
    console.log("Rate");
    optimisticLike(rating)
    updateLikesApi({profileId: profile?.id, showId: show?.id, type:type, rating: rating})
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
    currentEpisodeApi({profileId: profile?.id, showId: show?.id, type: type})
      .unwrap()
      .then((res)=>{
        e.preventDefault()
        dispatch(addToNowWatching(show?.id))
        navigate(`/watch/${type}/${show?.id}?tracking_id=${res?.id}`)
      })
      .catch((err)=>{console.error(err)})
    
  }

  const updateNowWatching = (e)=>{
    e.preventDefault()
    setNowWatching((prev)=>!prev)
    dispatch(removeFromNowWatching(show?.id))
    updateNowWatchingApi({profileId: profile?.id, showId: show?.id, type: type})
          .unwrap()
          .then((res)=>{
            console.log(res);
          })
          .catch((err)=>{
            dispatch(addToNowWatching(show?.id))
            setNowWatching((prev)=>!prev)
            console.error(err)
          })
  }

  const updateMylist = (e)=>{
    e.preventDefault()
    setMyList((prev)=>!prev)
    dispatch(addToMyList(show?.id))
    updateMyListApi({profileId: profile?.id, showId: show?.id, type: type})
          .unwrap()
          .then((res)=>{
            console.log(res);
            dispatch(addToMyList(show?.id))
          })
          .catch((err)=>{
            dispatch(addToMyList(show?.id))
            setMyList((prev)=>!prev)
            console.error(err)
          })
  }
   

  return (
    <div className='bg-[#111] z-0 text-white cursor-default flex justify-center'>
      <Nav links />
      <title>{show?.title || show?.name || show?.original_name} - Netflix Clone</title>
      <div className="bg-[#111] w-full h-[100%] flex-grow">
        <div className='relative  w-full min-h-screen overflow-y-auto scrollbar-hide flex flex-col bg-[#111] flex-wrap ring-white ring-1 items-center '>
          <img 
            src={`${baseurl}${show?.backdrop_path}`} 
            alt="show-banner" 
            className="object-contain rounded-md w-[100%]"
          />
          <div className= 'absolute inset-0 z-10 bg-gradient-to-tr from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.8)] object-cover'/>
            <div className='absolute inset-0 z-30 px-4 lg:px-24 md:px-16 top-1/4  md:top-1/4 lg:top-[20%] bg-gradient-to-b from-transparent to-[#111] items-center mr-4'>
              <p className='line-clamp-1 my-2 text-4xl'>{show?.title || show?.name || show?.original_name} { show?.next_episode_to_air && <p className="text-xl text-white">Next Episode on <span>{show?.next_episode_to_air?.air_date}</span></p> }</p>
              <div className='flex flex-wrap mt-2'>
              
                  <div className="block md:w-[50%]">
                    
                    <p className='text-lg line-clamp-4'>
                      {show?.overview}
                    </p>
                    
                    <div className="block mt-4">
                    <div className='flex items-center text-4xl justify-between mb-4 lg:w-[70%]'>
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
                  </div>
                  </div>
                  
                  <div className="block md:w-[50%] sm:mt-4 text-sm ">
                    <div className="float-right">
                      { show?.created_by?.length > 0 && <p>Creator(s): <span> { show?.created_by?.map((artist)=> artist.name).join(', ') } </span></p> }
                      <p className='text-sm line-clamp-1'>
                        Genres: {show?.genres?.map((genre)=>(genre.name)).join(', ')}
                      </p>
          
                      { show?.spoken_languages ? <p className='text-sm line-clamp-1'>
                        Languages: {show?.spoken_languages.map((lang)=>(lang.name)).join(', ')}
                      </p> : show?.languages && <p className='text-sm line-clamp-1'>
                        Languages: {show?.languages.map((lang)=>(lang)).join(', ')}
                      </p> }
                      { show?.runtime && <p>Episode Run Time: <span>{show?.runtime} mins</span></p>}
                      { show?.episode_run_time?.length > 0 && <p>Run Time: <span>{show?.episode_run_time[0]} mins</span></p>}
                      { show?.release_date && <p>Release date: <span>{show?.release_date}</span></p>}
                      { show?.first_air_date && <p>Release date: <span>{show?.first_air_date}</span></p>}
                      { show?.last_air_date && <p>Last Episode date: <span>{show?.last_air_date}</span></p> }
                      { show?.seasons && <p>Seasons: <span>{show?.seasons.length}</span></p> }
                    </div>
                    
                  </div>
                </div>

                { type === "tv" && (
                  <div className="block w-[100%]">
                      <div className="flex items-center w-[100%]">
                        <div className="w-[50%]">
                          <p className="text-2xl py-4">Season {season}</p>
                        </div>
                        <div className="w-[50%]">
                          <select name="seasons" className="float-right bg-transparent w-100% md:w-[60%] lg:w-[50%]  ring-white ring-[0.5px] text-white p-2 h-[50%] focus:ring-1" id="seasons" value={season} onChange={(e)=>setSeason(e.target.value)}>
                            { show?.seasons.map((season)=>(
                                <option key={season.id} className="bg-[#111] text-white ring-inherit" value={season.season_number}>{season.name}</option>
                              )) }
                          </select>
                        </div>
                      </div>
                      <TVSeasons show={show} season={season}/>
                  </div>
                )}
                <div className="w-full px-4">
                    <Recommendations show={show} type={type}/>
                  </div>
            </div>
            
        </div>
        

      </div>
    </div>
  )
}

export default ShowDetails