import { useGetMoviesQuery } from '../features/moviesApi'
import MovieCard from './MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


function Row({ title, fetchUrl, isLargeRow=false }) {

    const  { data, isLoading, isError, error } = useGetMoviesQuery(fetchUrl);
    

    const movies = data?.results

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>{error}</div>
    
  return (
    <div className="text-white ml-10 mt-5 group/outer">
        <a href={`/${title}`} className='h-2 flex items-center'>
            <h2 className='text-lg left-0 ml-1 font-semibold items-center inline-block'>
                { title } 
                <a className='ml-4 text-sm hidden group-hover/outer:inline-block text-slate-400' href={`/${title}`}>
                    Explore More 
                    <FontAwesomeIcon icon={faChevronRight} height={'30px'} width={'30px'} /> 
                </a>
            </h2>
        </a>
        <div className="flex overflow-x-scroll w-full scrollbar-hide">
            { movies.map((movie)=>(
                    <MovieCard key={movie?.id} movie={movie} isLargeRow={isLargeRow} />
            )) }
        </div>
    </div>
  )
}

export default Row