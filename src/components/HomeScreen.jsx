import Banner from './Banner'
import Nav from './Nav'
import Row from './Row'
import { useState } from 'react'
import { useGetMoreMoviesQuery } from '../features/moviesApi'
import { navTitles, titles } from '../utils/helper'
import MovieCard from './MovieCard'
import { useParams } from 'react-router-dom'


function HomeScreen() {

  const query = new URLSearchParams(window.location.search).get('query')

  return (
    <div className=''>
        <Nav links />

        { query !== null ? <NavPages query={query}/> : <Cards /> }
    </div>
  )
}

export const Cards = ()=>{
  return (
    <div className='h-[100%]'>
      <title> Home - Netflix Clone </title>
      <Banner nth={Math.floor(Math.random() * 10)}/>
        
        <Row
          title='Netflix Originals'
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
      <div className='pt-20 pl-5 pb-10 text-4xl text-white'>
          {query}
      </div>
      <div>
        <div className='bg-[#111] flex mt-0 pl-5 flex-wrap h-full z-10'>
            {shows?.map((show)=>(
                <MovieCard key={show?.id} movie={show}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export const NavLinkPage = ()=>{

  const {title} = useParams()
  console.log(title);
  console.log(navTitles['TV']);

  return (
    <div className=''>
      <Nav links />
      <title>{title} Shows</title>
      <NavPages query={navTitles[title]}/> 
    </div>
  )
}

export default HomeScreen