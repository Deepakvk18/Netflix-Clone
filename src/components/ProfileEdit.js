import React, { useState, useEffect } from 'react'

const ProfileEdit = ({ editProfile, addProfile, setEditProfile, setNewProfile, profile  }) => {

    const [name, setName] = useState(profile ? profile.name : '')
    const [children, setChildren] = useState(profile ? profile.children : false)
    const [backendError, setBackendError] = useState('')
  return (
    <div className='absolute bg-[#111] inset-0 h-full w-full flex z-40 justify-center items-center bg-opacity-80'>
        <div className='flex flex-col bg-[#111] flex-wrap p-5 rounded-xl w-[40%] ring-white ring-1 items-center'>
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
                        className={`h-12 w[40%] p-5 mb-2 pt-4 mr-2 text-sm text-white bg-gray-700 rounded-sm focus:border-white focus:ring-1 focus:ring-white peer `}
                        placeholder=" "
                        value={name}
                        onChange={(e)=>setName((prev)=>e.target.value)}
                    />
                </div>
            </div>
            <div className='flex m-2 justify-left items-center'>
                <label htmlFor="children" className='mr-4 text-xl'>
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
                    <button className='px-8 m-4 py-3 text-xl cursor-pointer text-black bg-white hover:ring-2 hover:text-white font-bold hover:bg-netflixColor' onClick={()=>{}}>
                        Add
                    </button>
                    <button className='my-10 m-4 mx-auto px-8 text-xl py-3 cursor-pointer bg-[#111] ring-gray-500 ring-2 text-gray-500 bg-opacity-40 hover:ring-2 hover:ring-white hover:text-white' onClick={()=>setNewProfile(false)}>
                        Cancel
                    </button>
                </div>
            ) }
            { editProfile && (
                <div className='flex-row justify-between'>
                <button className='my-10 px-8 m-4 py-3 text-xl cursor-pointer text-black bg-white hover:ring-2 hover:text-white font-bold hover:bg-netflixColor' onClick={()=>{}}>
                    Edit
                </button>
                <button className='my-10 px-8 m-4 text-xl py-3 cursor-pointer bg-[#111] ring-gray-500 ring-2 text-gray-500 bg-opacity-40 hover:ring-2 hover:ring-white hover:text-white' onClick={()=>setEditProfile(false)}>
                    Cancel
                </button>
                <button className='my-10 px-8 m-4 text-xl py-3 cursor-pointer bg-[#111] ring-gray-500 ring-2 text-gray-500 bg-opacity-40 hover:ring-2 hover:ring-white hover:text-white' onClick={()=>{}}>
                    Delete Profile
                </button>
            </div>
            )}
        </div>
    </div>
  )
}

export default ProfileEdit