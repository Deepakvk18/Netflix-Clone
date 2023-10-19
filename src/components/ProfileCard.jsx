import { getProfileImgUrl } from '../utils/profiles'
import { useNavigate } from 'react-router-dom'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { setCurrentProfile } from '../features/userSlice'
import { setLikes, setNowWatching, setMyList, setDislikes } from '../features/userSlice'
import { profileApi } from '../features/profileApi'
import { useState } from 'react'

const ProfileCard = ({ profile, manageProfiles, setEditProfile, setSelectedProfile }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const [clicked, setClicked] = useState(true)
    const [fetchRatings, { data: ratingsResponse }] = profileApi.useLazyGetRatingsQuery()
    const [fetchMyListIds, { data: myListResponse }] = profileApi.useLazyGetMyListIdsQuery()
    const [fetchNowWatchingIds, { data: nowWatchingResponse }] = profileApi.useLazyGetNowWatchingIdsQuery(profile?.id, { skip: clicked })

    const onProfileClick = async (e)=>{
      e.preventDefault()
      setClicked(false)
      await dispatch(setCurrentProfile({ profile }))
      await fetchRatings(profile?.id)
        .unwrap()
        .then(async(res)=>{
          await dispatch(setLikes(res))
        await dispatch(setDislikes(res))
        })
        .catch((err)=>{console.log(err)})
      await fetchMyListIds(profile?.id)
        .unwrap()
        .then(async(res)=>{
          await dispatch(setMyList(res))
        })
        .catch((err)=>{console.log(err)})
      
      await fetchNowWatchingIds(profile?.id)
        .unwrap()
        .then(async(res)=>{
          await dispatch(setNowWatching(res))
        })
        .catch((err)=>{console.log(err)})
      
      console.log(myListResponse, nowWatchingResponse, ratingsResponse);
      navigate('/browse')
    }



    

  return (
    <div className='relative group cursor-pointer' >
      <title>{ manageProfiles ? 'Manage Profiles - Netflix Clone' : 'Home - Netflix Clone'}</title>
        <div className='flex relative' onClick={manageProfiles ? ()=>{
          setSelectedProfile(profile)
          setEditProfile(true)
        } : ()=>{} }>
          <img 
              src={getProfileImgUrl(profile)} 
              alt="profile" 
              width={150}
              className={`m-4 rounded-sm hover:opacity-80 group-hover:ring-4 ring-white ${manageProfiles && 'opacity-50'}`}
              onClick={onProfileClick}
          />
          { manageProfiles && (
            <div className='absolute bg-transparent z-10 inset-0' >
                <div className='h-full w-full bg-transparent relative inset-0 flex justify-center items-center'>
                  <FontAwesomeIcon icon={faPencil} style={{color: '#ffffff'}} className=' fa-2x m-4 rounded-sm hover:opacity-80'/>
                </div>
            </div>
          ) }
        </div>
        <h3 className='m-4 text-center text-xl text-gray-400 group-hover:text-white'>
            {profile.name}
        </h3>
    </div>
  )
}

export default ProfileCard