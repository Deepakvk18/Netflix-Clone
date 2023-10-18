import { useParams } from "react-router-dom"
import { useGetVideosQuery } from "../features/moviesApi"
import Nav from "./Nav"
import ReactPlayer from "react-player"
import { useGetNextEpisodeMutation } from "../features/profileApi"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const Watch = () => {
  const { type, id } = useParams()
  const trackingId = new URLSearchParams(window.location.search).get('tracking_id')
  const { data } = useGetVideosQuery({ type, id })
  const video = Math.floor(Math.random() * (data?.results?.length - 1))
  const [nextEpisodeApi] = useGetNextEpisodeMutation()
  const navigate = useNavigate()

  const nextEpisode = ()=>{
    nextEpisodeApi(trackingId)
      .unwrap()
      .then((res)=>{
        console.log(res);
        if (res?.message){
          navigate('/browse')
          return
        }
        navigate(`/watch/${type}/${id}?tracking_id=${trackingId}`)
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  const nextMovie = ()=>{
    nextEpisodeApi(trackingId)
      .unwrap()
      .then((res)=>{
        console.log(res);
        navigate(`/browse`)
      })
      .catch((err)=>{
        console.log(err);
      })
  }


  return (
    <div className="bg-[#111] h-[100vh] w-[98vw]">
      <Nav links background />
      <title>Netflix Clone</title>
      <ReactPlayer
        width={'100%'}
        height={'90%'}
        style={{ position: 'absolute', top: '80px', left: '0' }}
        url={`https://www.youtube.com/watch?v=${data?.results[video]?.key}`}
      />
      { type === 'tv' ? (
        <button 
          onClick={nextEpisode}
          className="absolute bottom-20 right-0 z-2000 bg-gray-300 hover:bg-opacity-80 text-2xl px-8 py-2 rounded-lg mt-5 mr-5"
        >
          Next Episode
        </button>) : (
        <button 
          onClick={nextMovie}
          className="absolute bottom-20 right-0 z-2000 bg-gray-300 hover:bg-opacity-80 text-2xl px-8 py-2 rounded-lg mt-5 mr-5"
        >
          Home
        </button>
      )}
    </div>
  )
}

export default Watch