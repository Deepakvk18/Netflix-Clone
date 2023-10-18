import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { isValidEmail } from '../utils/validator'
import messages from '../utils/messages'
import { useNavigate } from 'react-router-dom'
import netflixLogo from './assets/images/Netflix-Brand-Logo.png'
import { useSignUpEmailMutation } from '../features/userApi'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

function SignUpScreen() {

    const [emailError, setEmailError] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [signUpApi] = useSignUpEmailMutation()
    const dispatch = useDispatch()

    const onSubmit = async (e)=>{
        e.preventDefault()
        // console.log(emailError || 'No Error', email, isValidEmail(email));
        if (!isValidEmail(email)){
            setEmailError(messages.emailInvalid)
            console.log("Error!!");
            return 
        }
        setEmailError('')
         // API Call
         signUpApi({email})
            .unwrap()
            .then((res)=>{
                console.log(res);
                dispatch(login({ email }))
                navigate('/signUp')
            })
            .catch((err)=>{
                console.error(err)
                setEmailError(err?.data?.message)
            })
         
    }

    useEffect(() => {
      if (emailError){
        if (email === "") setEmailError(messages.emailEmpty)
        else if (!isValidEmail(email)) setEmailError(messages.emailInvalid)
      }
    }, [emailError, email])
    

  return (
    <div className='max-h-screen min-w-screen' style={{
        position: 'relative',
        background: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg) center no-repeat',
        backgroundSize: 'cover',
        objectFit: 'cover',
        width: '100vw'
    }}>
        <title> Sign Up - Netflix Clone </title>
        <div className="flex flex-wrap w-[100vw]" >
            <LazyLoadImage
                src={netflixLogo}
                className='fixed left-2 w-40 z-30 md:left-40 md:w-[150px] object-contain cursor-pointer'
                onClick={()=>navigate('/')}
            />
            <button className='fixed right-8 md:right-40 z-30 top-7 px-4 py-1 text-white bg-netflixColor rounded-md font-semibold hover:bg-opacity-90' onClick={()=>navigate('/login')}>
                Sign In
            </button>
            <div className='relative w-full h-screen z-10 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.8)]' />
        </div>
        <div className="absolute flex-wrap items-center text-center w-[100vw] top-1/3 z-40 text-white flex justify-center">
            <div className='block justify-center'>
                <h1 className='font-bold flex-wrap text-lg lg:text-4xl mb-2'>
                Unlimited movies, TV shows and more
                </h1>

                <h2 className='text-sm lg:text-2xl mb-3 font-semibold'>
                Watch anywhere. Cancel anytime.
                </h2>

                <h3 className='text-xs lg:text-xl'>
                    Ready to watch? Enter your email to create or restart your membership.
                </h3>

                <div className="p-3 flex-col">
                    <form className='flex flex-wrap flex-between justify-center text-center items-top'>
                        <div className="relative flex-col text-left">
                            <div>
                                <input 
                                    type="text" 
                                    className={`bg-transparentBg h-14 w-[80vw] sm:w-96 p-5 mb-2 pt-4 mr-2 text-sm text-white rounded-sm focus:border-white focus:ring-1 focus:ring-white ring-gray-500 ring-1 peer ${emailError && 'ring-netflixColor '} ${email && !emailError && 'ring-green-400'}`}
                                    placeholder=" "
                                    value={email}
                                    onChange={(e)=>setEmail((prev)=>e.target.value)}
                                />
                                <label className="absolute text-sm text-gray-300 p-2 duration-300 transform pb-5 -translate-y-4 scale-90 top-2 origin-[0] px-4 peer-focus:px-4 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5 left-1 -z-40 peer-focus:font-bold">
                                    Enter your Email address
                                </label>
                            </div>
                            <div>
                            { emailError && (<span className='text-netflixMsgColor mt-4 pt-4 text-left text-semibold'>
                            <FontAwesomeIcon icon={faTriangleExclamation} width={'30px'} beatFade size="lg" style={{color: "rgb(235, 57, 66)",}} />
                             { ' ' + emailError }
                             
                        </span>) }
                        </div>
                        </div>
         
                        <button 
                            className='bg-netflixColor  flex h-14 w-56 top-0 mt-0 text-xl font-semibold rounded-lg justify-center items-center'
                            onClick={onSubmit}
                        >
                            Get Started
                            <FontAwesomeIcon icon={faChevronRight} className='ml-4' height={'30px'} width={'30px'} />
                        </button>
                
                    </form>
                    
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default SignUpScreen