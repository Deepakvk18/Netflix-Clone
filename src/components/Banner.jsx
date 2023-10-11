import { useGetMoviesQuery } from '../features/moviesApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function Banner({ nth }) {

  const { data: movies, isLoading, isError, error } = useGetMoviesQuery('fetchNetflixOriginals')
  var movie = (movies?.results[nth])
  const navigate = useNavigate();

  if (isError) return <div>{error}</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <header className='relative rounded-lg to-black h-[90vh] text-white object-contain flex justify-start mb-4' style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center'
    }}>
        <div className='block'>
          <div className='pt-44 ml-11 h-14 w-[45%]'>
              <div className='mt-8'>
                <h1 className="text-8xl font-bold ml-0 mb-5">
                  { movie?.title || movie?.name || movie?.original_name }
                </h1>
                <h1 className="text-white text-lg line-clamp-3 mt-4 mb-5">
                {movie?.overview}
                </h1>
              </div>
              <div>
                <button onClick={()=>navigate(`/watch/${'tv'}/${movie?.id}`)} className='cursor-pointer font-semibold border-radius-[0.2vw] px-6 mr-4 py-2 rounded-md bg-slate-100 opacity-90 text-black text-lg hover:bg-gray-300'>
                  <FontAwesomeIcon className='mr-2' icon={faPlay} /> Play
                </button>
                <button className='cursor-pointer font-semibold text-lg border-radius-[0.2vw] px-6 mr-4 py-2 rounded-md bg-buttonBg text-white hover:opacity-80' onClick={()=>navigate(`/details/${'tv'}/${movie?.id}`)}>
                <FontAwesomeIcon className='mr-2' icon={faCircleInfo} />
                  More Info
                </button>
              </div>
          </div>
          <div className="bg-gradient-to-b w-[100vw] lg:w-[99.45vw] z-10 from-transparent to-[#111] h-[650px] float-left" />  
        </div>
    </header>
  )
}
