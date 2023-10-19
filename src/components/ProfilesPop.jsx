import React from 'react'
import { getProfileImgUrl } from '../utils/profiles'
import { setLikes, setNowWatching, setMyList, setDislikes } from '../features/userSlice'
import { profileApi } from '../features/profileApi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentProfile } from "../features/userSlice";
import { useChangeProfileMutation } from '../features/profileApi'
import { useNavigate } from 'react-router-dom'

const ProfilesPop = ({ profile }) => {

    const [clicked, setClicked] = useState(true)

    // const { data: ratingsResponse } = useGetRatingsQuery(profile?.id, { skip: clicked })
    // const { data: myListResponse } = useGetMyListIdsQuery(profile?.id, { skip: clicked })
    // const { data: nowWatchingResponse } = useGetNowWatchingIdsQuery(profile?.id, { skip: clicked }) 
    const [changeProfileApi] = useChangeProfileMutation()
    const dispatch = useDispatch()

    const [fetchRatings, { data: ratingsResponse }] = profileApi.useLazyGetRatingsQuery()
    const [fetchMyListIds, { data: myListResponse }] = profileApi.useLazyGetMyListIdsQuery()
    const [fetchNowWatchingIds, { data: nowWatchingResponse }] = profileApi.useLazyGetNowWatchingIdsQuery(profile?.id, { skip: clicked })
    const navigate = useNavigate()

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
      changeProfileApi().unwrap()
      navigate('/browse')
    }


  return (
    <div className='flex items-center' onClick={onProfileClick}>
        <img width={35} className='my-1 mr-2 rounded-lg' src={getProfileImgUrl(profile)} alt="profile" /> 
        <p className='hover:underline cursor-pointer'>{profile.name}</p>
    </div>
  )
}

export default ProfilesPop