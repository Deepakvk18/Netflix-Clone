import { useState, useEffect } from "react"
import { isValidEmail, isValidPassword } from "../utils/validator"
import messages from "../utils/messages"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { selectProfiles } from "../features/userSlice"
import { useSelector } from "react-redux"
import { useMigrateProfileMutation } from "../features/profileApi"
import { useDispatch } from "react-redux"
import { login, logout } from "../features/userSlice"
import { useNavigate } from "react-router-dom"

const MigrateProfile = ({ setMigrateProfile }) => {

    const [profile, setProfile] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    const [password, setPassword] = useState('')
    const [backendError, setBackendError] = useState('')
    const profiles = useSelector(selectProfiles)
    const [migrateProfile] = useMigrateProfileMutation()
    const [profileId, setProfileId] = useState(profiles[0]?.id)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const migrateClick = (e)=>{
        e.preventDefault()
        if(!isValidEmail(email) || !isValidPassword(password)) return
        // API Call
        console.log(profileId);
        console.log("Migrate Profile");
        migrateProfile({ profileId, email, password })
            .unwrap()
            .then((originalPromiseResult)=>{
                console.log("Profile Migrated", originalPromiseResult);
                setMigrateProfile(false)
                dispatch(logout())
                dispatch(login(originalPromiseResult))
                navigate('/profiles')
                })
            .catch((error)=>{
                console.log("Error", error);
                setBackendError(error?.data?.message)
                })
    }

    const validateFields = ()=>{
        if(!isValidEmail(email)) setEmailError(messages.emailInvalid)
        if(!isValidPassword(password)) setPassError(messages.passwordInvalid)
    }

    useEffect(() => {
        if(!isValidEmail(email) && email) setTimeout(validateFields, 3000)
        else setEmailError('')
        if(!isValidPassword(password) && password) setTimeout(validateFields, 3000)
        else setPassError('')
      }, [emailError, email, password, passError, validateFields])

  return (
    <div className='fixed bg-[#111] text-white inset-0 w-[100vw] h-[100%] flex z-50 justify-center items-center bg-opacity-90'>
        
        <div className='flex flex-col bg-[#111] max-w-sm flex-wrap p-10 rounded-xl ring-white ring-1 items-center'>
            { backendError && 
                <div className='bg-errorText text-white text-left p-2 text-sm rounded-lg mb-4'>
                    { backendError }
                </div>
            }
            <h1 className='text-4xl w-full text-center my-5'>Migrate Profile</h1>
            <div className='block m-2 justify-left'>
                <div>
                    <label htmlFor="profile" className='mb-4 text-xl'>
                        Profile to Transfer 
                    </label>
                    <select className="bg-black h-12 rounded-lg ring-2 ring-white w-[100%]" name="profile" id="profile" value={profileId} onChange={(e)=>setProfileId(e.target.value)}>
                        { profiles.map((profile) => (
                            <option 
                                key={profile.id} 
                                value={profile.id}
                            >
                                {profile.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="my-4 text-lg">
                    Credentials of the Netflix account to which the profile is being transferred
                </div>
                <div className="relative mt-4 flex-col text-left">
                        <div>
                            <input 
                                type="text" 
                                className={`h-12 w-full mt-2 mb-2 bg-inputBg p-4 pb-2.5 pt-4 mr-2 text-sm text-white rounded-md focus:border-white focus:ring-1 focus:ring-white peer ${emailError && 'border-b-2 border-b-errorText ring-0'}`}
                                placeholder=" "
                                value={email}
                                onChange={(e)=>setEmail((prev)=>e.target.value)}
                            />
                            <label className="absolute text-md text-inputPH p-4 duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] px-4 peer-focus:px-4 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5 left-1 peer-focus:font-bold">                                
                            Email address
                            </label>
                        </div>
                        <div>
                            { emailError && (<span className='text-errorText mt-4 pt-4 text-sm text-left text-semibold'>
                            <FontAwesomeIcon icon={faTriangleExclamation} width={'30px'} beatFade size="sm" style={{color: "#E87C03",}} />
                                { ' ' + emailError }
                                
                            </span>) }
                        </div>
                    </div>
                    <div className="relative flex-col text-left">
                        <div>
                            <input 
                                type="password" 
                                className={`h-12 w-full mt-4 mb-2 bg-inputBg p-4 pb-2.5 pt-4 mr-2 text-sm text-white rounded-md focus:border-white focus:ring-1 focus:ring-white peer ${passError &&  'border-b-2 border-b-errorText ring-0'}`}
                                placeholder=" "
                                value={password}
                                onChange={(e)=>setPassword((prev)=>e.target.value)}
                            />
                            <label className="absolute text-md text-inputPH p-4 duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] px-4 peer-focus:px-4 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-90 peer-focus:-translate-y-4 left-1 peer-focus:font-bold">                                
                                Password
                            </label>
                        </div>
                        <div>
                            { passError && (<span className='text-errorText text-sm mt-4 pt-4 text-left text-semibold'>
                            <FontAwesomeIcon icon={faTriangleExclamation} width={'30px'} beatFade size="sm" style={{color: "#E87C03",}} />
                                { ' ' + passError }
                                
                            </span>) }
                        </div>
                    </div>
            </div>
            
                <div className='flex-row'>
                    <button className='px-8 m-4 py-3 text-xl cursor-pointer text-black bg-white hover:ring-2 hover:text-white font-bold hover:bg-netflixColor' onClick={migrateClick}>
                        Migrate
                    </button>
                    <button className='my-10 m-4 mx-auto px-8 text-xl py-3 cursor-pointer bg-[#111] ring-gray-500 ring-2 text-gray-500 bg-opacity-40 hover:ring-2 hover:ring-white hover:text-white' onClick={()=>setMigrateProfile(false)}>
                        Cancel
                    </button>
                </div>
        </div>
    </div>
  )
}

export default MigrateProfile