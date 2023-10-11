import { useParams } from "react-router-dom"
import { useGetVideosQuery } from "../features/moviesApi"
import Nav from "./Nav"
import ReactPlayer from "react-player"


const Watch = () => {
  const { type, id } = useParams()
  const { data } = useGetVideosQuery({ type, id })
  console.log(data);
  const video = Math.floor(Math.random() * (data?.results.length - 1))

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
    </div>
  )
}

export default Watch