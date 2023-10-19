import React, { useState, useEffect } from 'react'
import { useAddProfileMutation, useEditProfileMutation, useDeleteProfileMutation } from '../features/profileApi'

const ProfileEdit = ({ editProfile, addProfile, setEditProfile, setNewProfile, profile,   }) => {

    const [name, setName] = useState(profile ? profile.name : '')
    const [children, setChildren] = useState(profile ? profile.children : false)
    const [backendError, setBackendError] = useState('')
    const [ addProfileApi ] = useAddProfileMutation()
    const [ editProfileApi ] = useEditProfileMutation()
    const [ deleteProfileApi ] = useDeleteProfileMutation()

    const addProfileClick = (e)=>{
        e.preventDefault()
        if (name === '') {
            setBackendError('Name cannot be empty')
            return
        }
        
        addProfileApi({ name, children })
            .unwrap()
            .then((originalPromiseResult)=>{
                console.log("Profile Added", originalPromiseResult);
                setNewProfile(false)
            })
            .catch((error)=>{
                console.log("Error", error);
                setBackendError(error?.data?.message)
            })
      }
      
      const editProfileClick = (e)=>{
        e.preventDefault()
        if (name === '') {
            setBackendError('Name cannot be empty')
            return
        }
        editProfileApi({ ...profile, name, children })
            .unwrap()
            .then((originalPromiseResult)=>{
                console.log("Profile Edited", originalPromiseResult);
                setEditProfile(false)
            })
            .catch((error)=>{
                console.log("Error", error);
                setBackendError(error?.data?.message)
            })
      }

      const deleteProfileClick = ()=>{
        deleteProfileApi(profile?.id)
            .unwrap()
            .then((originalPromiseResult)=>{
                console.log("Profile Edited", originalPromiseResult);
                setEditProfile(false)
            })
            .catch((error)=>{
                console.log("Error", error);
                setBackendError(error?.data?.message)
            })
      }

  return (
    <div className='fixed bg-[#111] text-white inset-0 h-[100%] w-[100%] flex z-40 justify-center items-center bg-opacity-80'>
        
        <div className='flex flex-col bg-[#111] flex-wrap p-5 rounded-xl max-w-sm ring-white ring-1 items-center'>
            { backendError && 
                <div className='bg-errorText text-white text-left p-2 text-sm rounded-lg mb-4'>
                    { backendError }
                </div>
            }
            <h1 className='text-4xl w-full text-center my-5'>{editProfile ? 'Edit Profile' : 'Add Profile'}</h1>
            <div className='flex m-2 justify-left'>
                <div>
                    <label htmlFor="name" className='mr-4 text-xl'>
                        Profile Name
                    </label>
                    <input 
                        type="text" 
                        className={`h-12 w-full my-2 p-5 mb-2 pt-4 mr-2 text-sm text-white bg-gray-700 rounded-sm focus:border-white focus:ring-1 focus:ring-white peer `}
                        placeholder=" "
                        value={name}
                        onChange={(e)=>setName((prev)=>e.target.value)}
                    />
                </div>
            </div>
            <div className='flex w-full ml-4 items-center justify-left text-left'>
                <label htmlFor="children" className='mr-4 text-xl justify-left'>
                    Child?
                </label>
                <input 
                    type="checkbox" 
                    checked={children} 
                    onClick={()=>setChildren((prevState)=>!prevState)}
                    className='h-6 w-6 m-2 checked:accent-netflixColor'
                />
            </div>
            { addProfile && (
                <div className='flex-row'>
                    <button className='px-4 m-4 py-2 ring-inset text-xl cursor-pointer text-black bg-white hover:ring-2 hover:text-white font-bold hover:bg-netflixColor' onClick={addProfileClick}>
                        Add
                    </button>
                    <button className='my-4 m-4 mx-auto px-4 text-xl py-2 ring-inset cursor-pointer bg-[#111] ring-gray-500 ring-2 text-gray-500 bg-opacity-40 hover:ring-2 hover:ring-white hover:text-white' onClick={()=>setNewProfile(false)}>
                        Cancel
                    </button>
                </div>
            ) }
            { editProfile && (
                <div className='flex-row justify-between'>
                <button className='my-4 px-4 m-4 py-2 text-xl cursor-pointer text-black bg-white hover:ring-2 hover:text-white font-bold hover:bg-netflixColor' onClick={editProfileClick}>
                    Edit
                </button>
                <button className='my-4 px-4 m-4 text-xl py-2 ring-inset cursor-pointer bg-[#111] ring-gray-500 ring-2 text-gray-500 bg-opacity-40 hover:ring-2 hover:ring-white hover:text-white' onClick={()=>setEditProfile(false)}>
                    Cancel
                </button>
                <button className='my-4 px-4 m-4 text-xl py-2 ring-inset cursor-pointer bg-[#111] ring-gray-500 ring-2 text-gray-500 bg-opacity-40 hover:ring-2 hover:ring-white hover:text-white' onClick={deleteProfileClick}>
                    Delete Profile
                </button>
            </div>
            )}
        </div>
    </div>
  )
}

export default ProfileEdit