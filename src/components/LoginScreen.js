import { LazyLoadImage } from 'react-lazy-load-image-component'
import './assets/styles/LoginScreen.css'
import arrowImg from './assets/images/arrow-right.png'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { isValidEmail } from '../utils/validator'
import messages from '../utils/messages'

function LoginScreen() {

    const [emailError, setEmailError] = useState('')
    const [email, setEmail] = useState('')

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

    }

  return (
    <div className='loginScreen'>
        <title> Login - Netflix Clone </title>
        <div className="loginscreen__background">
            <LazyLoadImage
                src='https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png'
                className='loginscreen__logo'
            />
            <button className='loginScreen__button rounded-md font-semibold'>
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

                <div className="loginScreen__input p-3">
                    <form className='flex flex-between justify-center text-center items-center'>
                        <div className="relative">
                            <input 
                                type="text" 
                                className={`email__input h-14 w-96 p-4 pb-2.5 pt-4 mr-2 text-sm text-white rounded-sm focus:border-white caret-white focus:ring-1 focus:ring-white peer ${emailError && 'ring-netflixColor ring-1'}`}
                                placeholder=" "
                                value={email}
                                onChange={(e)=>setEmail((prev)=>e.target.value)}
                            />
                            <label className="absolute text-sm text-gray-300 p-4 duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] px-4 peer-focus:px-2 peer-placeholder-shown:scale-90 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-5 left-1">
                                Email address
                            </label>
                        </div>

                        <button 
                            className='loginScreen__getStarted flex h-14 w-56 text-xl font-semibold rounded-lg justify-center items-center'
                            onClick={onSubmit}
                        >
                            Get Started
                            <img 
                              src={arrowImg}
                              width={'30px'}
                              className='ml-4'
                            />
                        </button>
                    </form>
                    { emailError && (<span className='text-netflixColor text-semibold'>
                            <FontAwesomeIcon icon={faExclamation} beatFade size="lg" style={{color: "rgb(235, 57, 66)",}} />
                             { ' ' + emailError }
                        </span>) }
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginScreen