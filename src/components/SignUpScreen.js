import { LazyLoadImage } from 'react-lazy-load-image-component'
import './assets/styles/LoginScreen.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { isValidEmail } from '../utils/validator'
import messages from '../utils/messages'
import { useNavigate } from 'react-router-dom'
import netflixLogo from './assets/images/Netflix-Brand-Logo.png'

function SignUpScreen() {

    const [emailError, setEmailError] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

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
         try{
            
         } catch(error){

         }

    }

    useEffect(() => {
      if (emailError){
        if (email === "") setEmailError(messages.emailEmpty)
        else if (!isValidEmail(email)) setEmailError(messages.emailInvalid)
      }
    }, [emailError, email])
    

  return (
    <div className='loginScreen'>
        <title> Sign Up - Netflix Clone </title>
        <div className="loginscreen__background">
            <LazyLoadImage
                src={netflixLogo}
                className='loginscreen__logo'
                onClick={()=>navigate('/')}
            />
            <button className='loginScreen__button rounded-md font-semibold' onClick={()=>navigate('/login')}>
                Sign In
            </button>
            <div className='loginScreen__gradient' />
        </div>
        <div className="loginScreen__body">
            <div>
                <h1 className='font-bold text-5xl mb-4'>
                Unlimited movies, TV shows and more
                </h1>

                <h2 className='text-2xl mb-5 font-semibold'>
                Watch anywhere. Cancel anytime.
                </h2>

                <h3 className='text-md'>
                    Ready to watch? Enter your email to create or restart your membership.
                </h3>

                <div className="loginScreen__input p-3 flex-col">
                    <form className='flex flex-between justify-center text-center items-top'>
                        <div className="relative flex-col text-left">
                            <div>
                                <input 
                                    type="text" 
                                    className={`email__input h-14 w-96 p-4 pb-2.5 mb-2 pt-4 mr-2 text-sm text-white rounded-sm focus:border-white focus:ring-1 focus:ring-white peer ${emailError && 'ring-netflixColor ring-1'} ${email && !emailError && 'ring-green-400 ring-1'}`}
                                    placeholder=" "
                                    value={email}
                                    onChange={(e)=>setEmail((prev)=>e.target.value)}
                                />
                                <label className="absolute text-sm text-gray-300 p-4 duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] px-4 peer-focus:px-4 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5 left-1">
                                    Email address
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