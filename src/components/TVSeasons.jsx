import { useGetSeasonDetailsQuery } from "../features/moviesApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useSetCurrentEpisodeMutation } from "../features/profileApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentProfile } from "../features/userSlice";

const TVSeasons = ({ show, season }) => {

  const { data: seasonDetails } = useGetSeasonDetailsQuery({id: show?.id, season: season})
  const [setCurrentEpisodeApi] = useSetCurrentEpisodeMutation()
  const navigate = useNavigate()
  const profile = useSelector(selectCurrentProfile)

  

  const baseUrl = 'https://image.tmdb.org/t/p/original'

  const onPlay = (episode)=>{
    // e.preventDefault()
    console.log({type:'tv', showId: show?.id, season: season, episode: episode?.episode_number});
    setCurrentEpisodeApi({type:'tv', profileId: profile?.id, showId: show?.id, season: season, episode: episode?.episode_number})
          .unwrap()
          .then((res)=>{
            console.log(res);
            navigate(`/watch/${'tv'}/${show?.id}?tracking_id=${res?.id}`)
          })
          .catch((err)=>{
            console.error(err);
          })
  }


  return (
    <div className="flex flex-wrap w-full my-2 py-4 rounded-2xl ">
        <div className="text-lg py-2">
          { seasonDetails?.overview }
        </div>
        <div className="flex flex-wrap peer-hover:ring-1">
          { seasonDetails?.episodes?.map((episode, index)=>(
            <div key={episode.episode_number} className="relative rounded-md hover:bg-gray-400 hover:bg-opacity-30 flex w-[100%] lg:w-[50%] p-4 ">
              <img className="max-w-[50%] w-1/2 sm:w-1/3  md:w-1/3 lg:w-1/3 hover:opacity-80 rounded-md cursor-pointer peer object-cover" src={`${baseUrl}${episode?.still_path}`} alt="" onClick={()=>onPlay(episode)}/>
              <div className="absolute inset-0 z-2000 hidden peer-hover:flex">
                <div className="flex items-center justify-center text-center w-1/2 md:w-1/3 lg:1/6">
                  <FontAwesomeIcon className="cursor-pointer" icon={faCirclePlay} size={'2x'}/>
                </div>
              </div>
              <div className="block text-lg w-full pl-4 py-2">
                <div className="flex flex-wrap w-full">
                  <h2 className="text-sm md:text-xl w-full font-semibold cursor-pointer  hover:underline" onClick={()=>onPlay(episode)}>{index + 1}. { episode?.name }</h2>
                  { episode?.runtime && <p className="right-0 w-full float-right">{ episode?.runtime } mins</p> }
                </div>
                <p className="md:text-sm line-clamp-4 text-xs">{ episode?.overview }</p>
              </div>
            </div>
          )) }
          </div>
    </div>
  )
}

export default TVSeasons