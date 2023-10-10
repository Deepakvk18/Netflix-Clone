import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { useSearchShowsQuery } from '../features/moviesApi'
import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'

const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(window.location.search).get('query');
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const adult = true;
    const [shows, setShows] = useState([])
    const { data, isLoading, isError, error } = useSearchShowsQuery({query, adult, page})

    useEffect(()=>{
        console.log('shows', shows,'data', data);
        if(data?.results) 
            setShows(shows.concat(data?.results))
    }, [shows, data])

  return (
    <div className=' '>
        <Nav setSearchParams={setSearchParams} query={searchParams} handleEnter links background/>
        <div className=''>
        
        </div>

        <div className='bg-[#111] flex mt-10 flex-wrap h-full z-10'>
            {shows.map((show)=>(
                <MovieCard key={show?.id} movie={show} search/>
            ))}
        </div>
    </div>
  )
}

export default Search