import Nav from "./Nav"
import { useGetMyListQuery } from "../features/profileApi"
import { useSelector } from "react-redux"
import { selectCurrentProfile } from "../features/userSlice"
import MovieCard from "./MovieCard"

const MyList = () => {

    const profile = useSelector(selectCurrentProfile)
    const { data: myListResponse } = useGetMyListQuery(profile?.id)

  return (
    <div className='text-white bg-[#111] h-full min-h-[100vh]'>
        <Nav links background/>
        <div className='pt-20 pl-5 pb-10 text-4xl text-white'>
            My List
        </div>
        <div className='bg-[#111] flex mt-0 pl-5 flex-wrap h-full z-10'>
            {myListResponse?.shows?.map((show)=>(
                <MovieCard 
                    key={show?.id} 
                    movie={show} 
                    type={show?.type} 
                    search/>
            ))}
        </div>
    </div>
  )
}

export default MyList