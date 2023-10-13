import { useGetRecommendationsQuery } from "../features/moviesApi"
import MovieCard from "./MovieCard"

const Recommendations = ({ show, type }) => {

    const { data: recommendations } = useGetRecommendationsQuery({id: show?.id, type})

  return (
    <div className="py-4 text-2xl z-0">
        { recommendations?.results?.length > 0 && <h2>If you like {show?.title || show?.name || show?.original_name}, you may also like </h2>        }
        <div className='bg-transparent text-sm relative flex h-48 overflow-y-visible overflow-x-scroll scrollbar-hide z-10'>
            {recommendations?.results.map((recommendation)=>(
                <MovieCard key={recommendation?.id} movie={recommendation} type={type}/>
            ))}
        </div>
    </div>
  )
}

export default Recommendations