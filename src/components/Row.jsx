import { useGetMoviesQuery } from '../features/moviesApi'
import MovieCard from './MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { titles } from '../utils/helper'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCurrentProfile } from '../features/userSlice';

function Row({ title, query }) { 

    const profile = useSelector(selectCurrentProfile)
    var movies = []

    if (query) {
        const  { data, isLoading, isError, error } = query(profile?.id);
        movies = data?.shows
    } else {
        const  { data, isLoading, isError, error } = useGetMoviesQuery(titles[title]?.fetchUrl);
        movies = data?.results
    }

    // console.log(title, movies);
    
  return (
    <div className="relative text-white ml-10 mb-16 mt-5 group/outer z-20">
        <Link href={!query ? `/browse?query=${title}`: '/browse'} className='h-2 flex items-center'>
            <h2 className='text-xl left-0 ml-1 font-semibold items-center inline-block'>
                { title } 
                { !query && (
                    <Link className='ml-4 text-xs hidden group-hover/outer:inline-block text-slate-400' to={`/browse?query=${title}`}>
                        Explore More 
                        <FontAwesomeIcon icon={faChevronRight} height={'30px'} width={'30px'} /> 
                    </Link>
                ) }
            </h2>
        </Link>
        <div className="relative flex h-48 overflow-y-visible overflow-x-scroll scrollbar-hide">
            { movies?.map((movie)=>(
                    <MovieCard 
                        key={movie?.id} 
                        movie={movie} 
                        type={titles[title]?.type ? titles[title].type : null}
                    />
            )) }
        </div>
    </div>
  )
}

export default Row