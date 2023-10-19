import { useGetMoviesQuery } from '../features/moviesApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentEpisodeMutation } from '../features/profileApi'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentProfile } from '../features/userSlice'

export default function Banner({ nth }) {

  const { data: movies, isLoading, isError, error } = useGetMoviesQuery('fetchNetflixOriginals')
  var movie = (movies?.results[nth])
  const navigate = useNavigate();
  const profile = useSelector(selectCurrentProfile)
  const [currentEpisodeApi] = useGetCurrentEpisodeMutation()
  // console.log(currentEpisodeApi);
  

  if (isError) return <div>{error}</div>
  if (isLoading) return <div>Loading...</div>

  const onPlay = (e)=>{
    currentEpisodeApi({profileId: profile?.id, showId: movie?.id, type: 'tv'})
      .unwrap()
      .then((res)=>{
        e.preventDefault()
        navigate(`/watch/${'tv'}/${movie?.id}?tracking_id=${res?.id}`)
      })
      .catch((err)=>{console.error(err)})
    
  }

  return (
    <header className='relative rounded-lg to-black w-[99.3vw] h-[90vh] text-white object-contain flex justify-start mb-4' style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center'
    }}>
        <div className="absolute h-[90vh] inset-0  w-[100vw] lg:w-[99.3vw] z-10 bg-gradient-to-tr from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.8)] float-left" />  
        <div className='block z-30'>
          <div className='pt-44 mx-11 h-14 sm:w-[45%]'>
              <div className='mt-8'>
                <h1 className="text-4xl xl:text-8xl font-bold ml-0 mb-5">
                  { movie?.title || movie?.name || movie?.original_name }
                </h1>
                <h1 className="text-white text-lg line-clamp-3 mt-4 mb-5">
                {movie?.overview}
                </h1>
              </div>
              <div>
                <button 
                  onClick={onPlay} 
                  className='cursor-pointer font-semibold border-radius-[0.2vw] px-6 mr-4 py-2 rounded-md bg-slate-100 opacity-90 text-black text-lg hover:bg-gray-300'>
                    <FontAwesomeIcon className='mr-2' icon={faPlay} /> Play
                </button>
                <button className='cursor-pointer font-semibold text-lg border-radius-[0.2vw] px-6 mr-4 py-2 rounded-md bg-buttonBg text-white hover:opacity-80' onClick={()=>navigate(`/details/${'tv'}/${movie?.id}`)}>
                <FontAwesomeIcon className='mr-2' icon={faCircleInfo} />
                  More Info
                </button>
              </div>
          </div>
          
        </div>
    </header>
  )
}
