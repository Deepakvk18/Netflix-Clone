import React, { useState, useEffect } from 'react'
import profiles from '../profiles'
import ProfileCard from './ProfileCard'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import ProfileEdit from './ProfileEdit'

const Profile = ({ manageProfiles }) => {
    manageProfiles = true
    const navigate = useNavigate()
    const [newProfile, setNewProfile] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [selectedProfile, setSelectedProfile] = useState(null)

    useEffect(() => {
        console.log(selectedProfile);
    }, [selectedProfile])
    

  return (
    <div className='relative h-[100%] md:h-[100vh] block m-auto bg-[#111] text-white'>
        <div className='flex relative'>
            <div className='relative m-auto py-16 md:py-32'>
                <h1 className='text-4xl mb-8 lg:text-[70px] text-center'>{ manageProfiles ? 'Manage Profiles' : "Who's Watching?" }</h1>
                <div className='flex flex-row flex-wrap justify-center'>
                    {profiles.map((profile)=>(
                        <ProfileCard key={profile.id} profile={profile} manageProfiles={manageProfiles} setEditProfile={()=>setEditProfile((prevState)=>!prevState)} setSelectedProfile={setSelectedProfile}/>
                    ))}
                    {profiles.length < 5 && (
                        <div className='cursor-pointer p-4 border-radius-lg hover:text-white'>
                            <div className='peer m-2 hover:bg-slate-300' onClick={()=>setNewProfile(true)}> 
                                <FontAwesomeIcon  icon={faPlusCircle} style={{color: '#404040'}} className='fa-7x m-4 rounded-sm '/>
                                
                            </div>
                        </div>
                    )}
                </div>
                { manageProfiles ? (<>
                    <button className='block my-10 mx-auto px-8 py-3 text-xl cursor-pointer text-black bg-white hover:ring-2 hover:text-white font-bold hover:bg-netflixColor' onClick={()=>navigate('/browse')}>
                        Done
                    </button>
                </>) : (
                    <button className='block my-10 mx-auto px-8 text-xl py-3 cursor-pointer bg-[#111] ring-gray-500 ring-2 text-gray-500 bg-opacity-40 hover:ring-2 hover:ring-white hover:text-white' onClick={()=>navigate('/manageProfiles')}>
                        Manage Profiles
                    </button>
                ) }
            </div>
        </div>
        { editProfile && (
            <ProfileEdit 
                setEditProfile={setEditProfile}
                editProfile={editProfile}
                profile={selectedProfile}
            />
        )}
        { newProfile && (
            <ProfileEdit 
                addProfile={newProfile}
                setNewProfile={setNewProfile}
            />
        )}
    </div>
  )
}

export default Profile