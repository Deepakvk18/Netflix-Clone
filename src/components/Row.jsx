import { useGetMoviesQuery } from '../features/moviesApi'
import MovieCard from './MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { titles } from '../utils/helper'; 

function Row({ title }) { 

    const  { data, isLoading, isError, error } = useGetMoviesQuery(titles[title]?.fetchUrl);

    const movies = data?.results
    
    if (title === 'Popular TV')

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>{error}</div>

    console.log(title, movies);
    
  return (
    <div className="relative text-white ml-10 mb-16 mt-5 group/outer z-20">
        <a href={`/${title}`} className='h-2 flex items-center'>
            <h2 className='text-xl left-0 ml-1 font-semibold items-center inline-block'>
                { title } 
                <a className='ml-4 text-xs hidden group-hover/outer:inline-block text-slate-400' href={`/browse?query=${title}`}>
                    Explore More 
                    <FontAwesomeIcon icon={faChevronRight} height={'30px'} width={'30px'} /> 
                </a>
            </h2>
        </a>
        <div className="relative flex h-48 overflow-y-visible overflow-x-scroll scrollbar-hide">
            { movies?.map((movie)=>(
                    <MovieCard key={movie?.id} movie={movie} type={titles[title].type}/>
            )) }
        </div>
    </div>
  )
}

export default Row