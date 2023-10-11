import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { useSearchMoviesOrTVQuery } from '../features/moviesApi'
import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'

const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const query = new URLSearchParams(window.location.search).get('query');
    const navigate = useNavigate();
    const { data: tv} = useSearchMoviesOrTVQuery({query, type:'tv'})
    const { data: movies } = useSearchMoviesOrTVQuery({query, type:'movie'})

    console.log(query, tv, movies);

  return (
    <div className='text-white bg-[#111] h-full min-h-[100vh]'>
        <Nav setSearchParams={setSearchParams} query={searchParams} handleEnter links background/>
        <div className='pt-20 pl-5 pb-10 text-4xl text-white'>
            Search Results for: {query}
        </div>
        <div className='text-2xl p-5 text-white'>
            Movie Shows
        </div>
        <div className='bg-[#111] flex mt-0 pl-5 flex-wrap h-full z-10'>
            {movies?.results.map((show)=>(
                <MovieCard key={show?.id} movie={show} type="movie" search/>
            ))}
        </div>
        <div className='text-2xl p-5 text-white'>
            TV Shows
        </div>
        <div className='bg-[#111] flex mt-0 pl-5 flex-wrap h-full z-10'>
            {tv?.results.map((show)=>(
                <MovieCard key={show?.id} movie={show} type="tv" search/>
            ))}
        </div>
    </div>
  )
}

export default Search