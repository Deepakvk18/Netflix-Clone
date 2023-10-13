import {
    Popover,
    PopoverHandler,
    PopoverContent,
  } from "@material-tailwind/react";
  import profiles, { getProfileImgUrl } from '../utils/profiles'
  import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
  import React from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
   
  export function ProfilePopover({ setMigrateProfile }) {
    const [openPopover, setOpenPopover] = React.useState(false);
    const currentProfile = profiles[3]
    
   
    const triggers = {
      onMouseEnter: () => setOpenPopover(true),
      onMouseLeave: () => setOpenPopover(false),
    };
   
    return (
      <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler {...triggers}>
        <div className='fixed flex right-20 group items-center cursor-pointer'>
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
              <a href='/browse' className='cursor-pointer hover:underline'>Home</a>
          </div>
          { profiles.filter((profile)=>profile.id !== currentProfile.id).map((profile, index) => (
              <div key={index} className='flex items-center'>
                  <img width={35} className='my-1 mr-2 rounded-lg' src={getProfileImgUrl(profile)} alt="profile" /> 
                  <p className='hover:underline cursor-pointer' onClick={()=>{}}>{profile.name}</p>
          </div>
          ))}
          <a href='/manageProfiles' className='block cursor-pointer my-2 hover:underline'>Manage Profiles</a>
          <a href='/account' className='block cursor-pointer my-2 hover:underline'>Account</a>
          <p onClick={()=>setMigrateProfile(true)} className='block cursor-pointer my-2 hover:underline'>Transfer Profile</p>
          <a target="_blank" rel='norefferer' href='https://github.com/Deepakvk18/Netflix-Clone' className='block cursor-pointer my-2 hover:underline'>Help Center</a>
          <div className='border-t-2 border-gray-500 justify-center items-center text-center my-4'>
              <p className='m-2 cursor-pointer hover:underline' onClick={()=>{}}>Sign out of Netflix</p>
          </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  export default ProfilePopover;