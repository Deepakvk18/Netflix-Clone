import Banner from './Banner'
import Nav from './Nav'
import Row from './Row'
import { useGetMoreMoviesQuery } from '../features/moviesApi'
import { navTitles, titles } from '../utils/helper'
import MovieCard from './MovieCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentProfile } from '../features/userSlice'
import { useEffect } from 'react'
import { useGetMyListQuery, useGetMyListIdsQuery, useGetNowWatchingIdsQuery, useGetNowWatchingQuery, useGetRatingsQuery, useGetProfileRecommendationsQuery } from '../features/profileApi'
import { useDispatch } from 'react-redux'
import { setLikes, setNowWatching, setMyList, setDislikes } from '../features/userSlice'

function HomeScreen() {

  const query = new URLSearchParams(window.location.search).get('query')
  const dispatch = useDispatch()

  const profile = useSelector(selectCurrentProfile)

    const { data: ratingsResponse } = useGetRatingsQuery(profile?.id)
    const { data: myListResponse } = useGetMyListIdsQuery(profile?.id)
    const { data: nowWatchingResponse } = useGetNowWatchingIdsQuery(profile?.id)

    useEffect(() => {
      if(myListResponse) dispatch(setMyList(myListResponse))
      if(nowWatchingResponse) dispatch(setNowWatching(nowWatchingResponse))
      if(ratingsResponse) {
        dispatch(setLikes(ratingsResponse))
        dispatch(setDislikes(ratingsResponse))
      }
    }, [ratingsResponse, myListResponse, nowWatchingResponse])
    

  return (
    <div className=''>
        <Nav links />
        { query !== null ? <NavPages query={query}/> : <Cards /> }
    </div>
  )
}

export const Cards = ()=>{

  const navigate = useNavigate()
  const currentProfile = useSelector(selectCurrentProfile)
  
  useEffect(()=>{
    if(!currentProfile) navigate('/profiles')
  }, [currentProfile])

  return (
    <div className='h-[100%]'>
      <title> Home - Netflix Clone </title>
      <Banner nth={Math.floor(Math.random() * 10)}/>

        <Row
          title='Continue Watching...'
          query={useGetNowWatchingQuery}
          continueWatching
        />

        <Row
          title='Your List'
          query={useGetMyListQuery}
        />
        
        <Row
          title='Netflix Originals'
        />

        <Row
          title='Recommended for you'
          query={useGetProfileRecommendationsQuery}
        />

        <Row
          title='Trending Now'
        />

        <Row
          title='Popular TV'
        />

        <Row
          title='Top Rated Movies'
        />

        <Row
          title='Top Rated TV'
        />

        <Row
          title='Action Movies'
        />

        <Row
          title='Comedy Movies'
        />

        <Row
          title='Horror Movies'
        />

        <Row
          title='Romance Movies'
        />

        <Row
          title='Documentaries'
        />
        <footer className='h-[50px] bg-[#111]'>

        </footer>
    </div>
  )
}

export const NavPages = ({ query })=>{

  const { data: shows, isError, error, isLoading } = useGetMoreMoviesQuery(titles[query]?.fetchUrl)

  return (
    <div className='min-h-[100vh] text-white'>
      <title> {query} - Netflix Clone </title>
      <div className='pt-20 px-5 pb-10 text-4xl text-white'>
          {query}
      </div>
      <div>
        <div className='bg-[#111] mt-0 px-5 flex justify-center flex-wrap h-full z-10'>
            {shows?.map((show)=>(
                <MovieCard key={show?.id} movie={show} type={titles[query].type}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export const NavLinkPage = ()=>{

  const {title} = useParams()
  console.log(title);

  return (
    <div className=''>
      <Nav links />
      <title>{title} Shows</title>
      <NavPages query={navTitles[title]}/> 
    </div>
  )
}

export default HomeScreen