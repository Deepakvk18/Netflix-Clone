import './Banner.css'
import axios from '../axios'
import requests from '../requests'
import { useState, useEffect } from 'react'

export default function Banner() {

  const [movie, setMovie] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const req = await axios.get(requests.fetchNetflixOriginals);
      setMovie(req.data.results[
        Math.floor(Math.random() * req.data.results.length -1)
      ])
      return req;
    }
    fetchData()
  }, [])

  console.log(movie)

  function truncate(string, n){
    return string?.length > n ? string.substring(0, n-1)+'...' : string
  }


  return (
    <header className='banner' style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center'
    }}>
        <div className='banner__contents'>
            <h1 className="banner__title">
              { movie?.title || movie?.name || movie?.original_name }
            </h1>
            <div className="banner__buttons">
              <button className='banner__button'>Play</button>
              <button className='banner__button'>My List</button>
            </div>
            <h1 className="banner__description">
              { truncate(
                movie?.overview, 150)}
            </h1>
        </div>
        <div className="banner--fadeBottom" />
    </header>
  )
}
