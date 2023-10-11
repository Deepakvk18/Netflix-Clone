import { getProfileImgUrl } from '../utils/profiles'
import { useNavigate } from 'react-router-dom'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProfileCard = ({ profile, manageProfiles, setEditProfile, setSelectedProfile }) => {
    const navigate = useNavigate()

  return (
    <div className='relative group cursor-pointer' >
      <title>{ manageProfiles ? 'Manage Profiles - Netflix Clone' : 'Home - Netflix Clone'}</title>
        <div className='flex relative' onClick={manageProfiles ? ()=>{
          setSelectedProfile(profile)
          setEditProfile(true)
        } : ()=>navigate('/browse')}>
          <img 
              src={getProfileImgUrl(profile)} 
              alt="profile" 
              width={150}
              className={`m-4 rounded-sm hover:opacity-80 group-hover:ring-4 ring-white ${manageProfiles && 'opacity-50'}`}
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