import {
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
import { getProfileImgUrl } from '../utils/profiles'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectCurrentProfile } from '../features/userSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectProfiles } from "../features/userSlice";
import { logout } from "../features/userSlice";
import { useLogoutMutation } from "../features/authApi";
import ProfilesPop from "./ProfilesPop";

   
  export function ProfilePopover({ setMigrateProfile }) {
    const [openPopover, setOpenPopover] = React.useState(false);
    const currentProfile = useSelector(selectCurrentProfile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profiles = useSelector(selectProfiles)
    const [logoutApi] = useLogoutMutation()
    

    

    const onLogout = (e)=>{
      e.preventDefault()
      // console.log(logoutApi);
      logoutApi()
      dispatch(logout())
      window.location.reload()
    }
   
    const triggers = {
      onMouseEnter: () => setOpenPopover(true),
      onMouseLeave: () => setOpenPopover(false),
    };
   
    return (
      <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler {...triggers}>
        <div className='fixed flex top-9 right-2 sm:right-10 group items-center cursor-pointer'>
                  <img
                      className='rounded-md cursor-pointer'
                      src={getProfileImgUrl(currentProfile)}
                      alt='profile'
                      width={33}
                  />
                  <FontAwesomeIcon 
                      className='m-2 cursor-pointer hover:transform hover:rotate-180 transition-all ease-in-out delay-150 duration-300 group-hover:rotate-180'
                      icon={faCaretDown}
                      size='sm' 
                      style={{color: '#fff'}} 
                  />
              </div>
        </PopoverHandler>
        <PopoverContent {...triggers} className="z-50 bg-[#111] ring-0 border-0 text-white w-[200px]">
          <div className="mb-2 block bg-[#111] items-center gap-3 justify-left">
           <div className='flex border-b-2 border-gray-600 items-center'>
              <img width={35} className='my-1 mr-2 rounded-lg' src={getProfileImgUrl(currentProfile)} alt="profile" /> 
              <Link to='/browse' className='cursor-pointer hover:underline'>Home</Link>
          </div>
          { profiles?.filter((profile)=>profile?.id !== currentProfile?.id).map((profile, index) => (
             <ProfilesPop key={index} profile={profile}/>
          ))}
          <Link to='/manageProfiles' className='block cursor-pointer my-2 hover:underline'>Manage Profiles</Link>
          <Link to='/account' className='block cursor-pointer my-2 hover:underline'>Account</Link>
          <p onClick={()=>setMigrateProfile(true)} className='block cursor-pointer my-2 hover:underline'>Transfer Profile</p>
          <Link target="_blank" rel='norefferer' to='https://github.com/Deepakvk18/Netflix-Clone' className='block cursor-pointer my-2 hover:underline'>Help Center</Link>
          <div className='border-t-2 border-gray-500 justify-center items-center text-center my-4'>
              <p className='m-2 cursor-pointer hover:underline' onClick={onLogout}>Sign out of Netflix</p>
          </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  export default ProfilePopover;