import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { isValidEmail, isValidPassword } from '../utils/validator'
import messages from '../utils/messages'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'
import netflixLogo from './assets/images/Netflix-Brand-Logo.png'
import { useLoginMutation } from '../features/authApi'

function SignInScreen() {

    const [emailError, setEmailError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passError, setPassError] = useState('')
    const [checked, setChecked] = useState(false)
    const [backendError, setBackendError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginMutation] = useLoginMutation()

    const onSubmit = async (e)=>{
            e.preventDefault()
            // console.log(emailError || 'No Error', email, isValidEmail(email));
            if (!isValidEmail(email)){
                setEmailError(messages.emailInvalid)
            }
            if (!isValidPassword(password)){
                setPassError(messages.passwordInvalid)
            }
            if(emailError || passError) return;
            if (!email || !password) {
                setBackendError('Please fill all the fields')
                return
            }

            setEmailError('')
            setPassError('')

            await loginMutation({ email, password })
                    .unwrap()
                    .then(async (payload)=> {
                        // console.log(payload);
                        await dispatch(login(payload))
                        console.log(payload)
                        if (payload.plan.price === 0) navigate('/signUp/plans')
                        else navigate('/profiles')
                    })
                    .catch((error)=>{
                        console.error(error);
                        setBackendError(error.response ? error.response.data.message : error.data.message)
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
    <div className='flex min-h-screen min-w-screen justify-center items-center' style={{
        position: 'relative',
        background: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg) center no-repeat',
        backgroundSize: 'cover',
        objectFit: 'cover',
        width: '100vw'
    }}>
        <title> Sign In - Netflix Clone </title>
        <div className="flex z-0">
            <LazyLoadImage
                src={netflixLogo}
                className='fixed left-2 w-40 top-0 md:left-40 md:w-[150px] object-contain cursor-pointer'
                onClick={()=>navigate('/')}
                width={200}
            />
        </div>
        <div className='absolute w-full h-screen z-10 bg-gradient-to-tr from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.8)]' />
        
        <div className='flex w-[80vw] z-1000 px-[5vw] md:w-[50vw] sm:w-[90vw] lg:w-[27vw] h-full py-[2%] rounded-lg bg-bgLogin z-1 justify-center items-center'>
            <div className='flex pt-0 mt-4 justify-start flex-col'>
                <h1 className='text-4xl mb-4 text-white font-semibold text-left'>
                    Sign In
                </h1>
                
                <form className='flex flex-between w-full md:w-[30vw] lg:w-[20vw] flex-col justify-center text-center items-top'>
                { backendError && 
                    <div className='bg-errorText text-white text-left p-2 text-sm rounded-lg mb-4'>
                        { backendError }
                    </div>
                }
                    <div className="relative flex-col text-left">
                        <div>
                            <input 
                                type="text" 
                                id='email-input'
                                className={`h-12 w-full mt-2 mb-2 bg-inputBg p-4 pb-2.5 pt-4 mr-2 text-sm text-white rounded-md focus:border-white focus:ring-1 focus:ring-white peer ${emailError && 'border-b-2 border-b-errorText ring-0'}`}
                                placeholder=" "
                                value={email}
                                onChange={(e)=>setEmail((prev)=>e.target.value)}
                            />
                            <label className="absolute text-md text-inputPH p-4 duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] px-4 peer-focus:px-4 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5 left-1 peer-focus:font-bold cursor-text" onClick={()=>document.getElementById('email-input').focus()}>                                
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
                                id='password-input'
                                className={`h-12 w-full mt-4 mb-2 bg-inputBg p-4 pb-2.5 pt-4 mr-2 text-sm text-white rounded-md focus:border-white focus:ring-1 focus:ring-white peer ${passError &&  'border-b-2 border-b-errorText ring-0'}`}
                                placeholder=" "
                                value={password}
                                onChange={(e)=>setPassword((prev)=>e.target.value)}
                            />
                            <label className="absolute text-md text-inputPH p-4 duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] px-4 peer-focus:px-4 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 peer-focus:scale-90 peer-focus:-translate-y-4 left-1 peer-focus:font-bold cursor-text" onClick={()=>document.getElementById('password-input').focus()}>                                
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
                        
                    <button 
                        className='bg-netflixColor mt-8 flex h-12 mb-4 text-lg text-white font-semibold rounded-lg justify-center items-center'
                        onClick={onSubmit}
                    >
                        Sign In
                        
                    </button>
                </form>
                <div className='text-loginFormText w-full mb-2 text-sm font-medium'>
                    <input
                        type='checkbox'
                        className='accent-loginFormText h-4'
                        checked={checked}
                    />
                    <span className='cursor-default' onClick={()=>setChecked((prev)=>!prev)}>
                       {' '} Remember Me?
                    </span>
                    <a href='/forgot-password' className='hover:underline float-right'>
                        Need Help?
                    </a>
                </div>
                <div className='text-md w-full mb-10 text-loginFormText'>
                    New to Netflix? <a href='/' className='text-white font-semibold hover:underline'> Sign Up now </a>.
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default SignInScreen