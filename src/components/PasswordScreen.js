import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { isValidPassword } from '../utils/validator'
import messages from '../utils/messages'
import { useNavigate } from 'react-router-dom'
import './assets/styles/LoginScreen.css'
import axios from 'axios'
import {backend} from '../utils/baseUrl'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectEmail } from '../features/userSlice'
import NavSignUp from './NavSignUp'

const PasswordScreen = () => {

    const email = useSelector(selectEmail)
    const [password, setPassword] = useState('')
    const [passError, setPassError] = useState('')
    const [backendError, setBackendError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (e)=>{
        e.preventDefault()
        // console.log(emailError || 'No Error', email, isValidEmail(email));

        if (!isValidPassword(password)){
            setPassError(messages.passwordInvalid)
        }
        if(passError) return;

        setPassError('')
        try{
            const res = await axios.post(backend + '/auth/signin', { email: email, password: password })
            dispatch(login(res.data))
            localStorage.setItem('user', res.data)
            console.log(localStorage.getItem('user'))
            console.log(res.data);
            navigate('/browse')
        } catch (error){
            setBackendError(error.response ? error.response.data.message: error.message)
            console.error(error)
        }

    }

    const validateFields = ()=>{
        if(!isValidPassword(password)) setPassError(messages.passwordInvalid)
    }

    useEffect(() => {
        if(!isValidPassword(password) && password) setTimeout(validateFields, 3000)
        else setPassError('')

    }, [password, passError, validateFields])

  return (
    <div className='absolute inset-0 w-full bg-white block'>
        <title> Enter Password - Netflix Clone </title>
        <NavSignUp/>
        
        <div className='relative flex max-w-full mx-auto md:w-[50vw] sm:w-[90vw] lg:w-[50vw] h-full py-[2%] rounded-lg z-10 justify-center items-start'>
                
            <div className='flex-wrap mt-10 justify-center flex-col'>
            { backendError && 
                    <div className='bg-errorText w-[100%] text-white text-left p-2 text-sm rounded-lg mb-4'>
                        { backendError }
                    </div>
                }
                <div className='text-xl font-mono'>
                STEP <b>1</b> OF <b>3</b>
                </div>
                <br/>
                <div className='text-4xl flex-wrap font-semibold'>
                Welcome back!<br/>
                Joining Netflix is easy.
                </div>
                <br/>
                <div className='flex-wrap text-xl mb-2'>
                Enter your password and you'll be watching in no<br/> time.
                </div>
                
                <form className='flex flex-between w-full md:w-[30vw] lg:w-[30vw] flex-col justify-center text-center items-top'>
                
                    <div className="relative flex-col text-left">
                        <div className='flex-row'>
                            <h5 className='text-xl font-semibold mb-2'>
                                Email
                            </h5>
                            <p className='text-md font-bold mb-3'>
                                {email || 'asdfb@gmail.com'}
                            </p>
                        </div>
                    </div>
                    <div className="relative flex-col text-left">
                        <div>
                            <input 
                                type="password" 
                                className={`h-12 w-full bg-transparent mt-4 mb-2 p-4 pb-2.5 pt-4 mr-2 text-sm text-black rounded-sm focus:border-gray-400 focus:ring-1 focus:ring-gray-600 peer ring-1 ring-gray-500 ${passError &&  'border-b-2 border-b-errorText ring-0'}`}
                                placeholder=" "
                                value={password}
                                onChange={(e)=>setPassword((prev)=>e.target.value)}
                            />
                            <label className="absolute text-md text-inputPH p-4 duration-300 transform -translate-y-4 scale-90 top-2 -z-10 origin-[0] px-4 peer-focus:px-4 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-90 peer-focus:-translate-y-4 left-1 peer-focus:font-bold ">                                
                                Enter your Password
                            </label>
                        </div>
                        <div>
                            { passError && (<span className='text-errorText text-sm mt-4 pt-4 text-left text-semibold'>
                            <FontAwesomeIcon icon={faTriangleExclamation} width={'30px'} beatFade size="sm" style={{color: "#E87C03",}} />
                                { ' ' + passError }
                                
                            </span>) }
                        </div>
                    </div>
                        
                    <button 
                        className='bg-netflixColor mt-8 flex h-14 mb-4 text-lg text-white font-semibold rounded-sm justify-center items-center'
                        onClick={onSubmit}
                    >
                        Sign Up
                        
                    </button>
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default PasswordScreen