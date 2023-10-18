import React from 'react'
import NavSignUp from './NavSignUp'
import { useCheckOutMutation } from '../features/paymentsApi'

const Payment = () => {

    const priceId =  new URLSearchParams(window.location.search).get('plan')
    const [checkoutMutation] = useCheckOutMutation()

    const submit = async(e) => {
        e.preventDefault()
        await checkoutMutation({ priceId })
            .unwrap()
            .then((res)=>{
                console.log(res);
                window.open(res.url, '_blank')
            })
            .catch((error)=>{
                console.error(error);
            })
    }

    


  return (
    <section className='absolute inset-0 w-full bg-white block'>
        <title> Subscribe - Netflix Clone </title>
        <NavSignUp/>
        <div className='relative w-full mt-10 bg-white flex justify-center items-center'>            
            <div className='flex-col justify-center items-start md:w-[50vw] sm:w-[90vw] lg:w-[50vw] py-[2%] rounded-lg'>
                <div className='flex'>
                    <img
                        src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Lock.png"
                        alt="pay"
                        width={60}
                        className="m-auto"
                    />
                </div>
                    
                <div className='flex mt-10 w-full justify-center text-center flex-col'>
                    <div className='text-xl font-mono'>
                        STEP <b>3</b> OF <b>3</b>
                    </div>
                    <br/>
                    <div className='text-4xl flex-wrap font-semibold'>
                    Set up Subscription
                    </div>
                    <br/>
                    <div className='flex-wrap text-2xl  mb-2'>
                    Your payment is encrypted and you can change your payment method at anytime.
                    </div>   
                    <div className='flex-wrap text-xl font-bold mb-2'>
                    Secure for peace of mind.<br/>
Cancel easily online.
                    </div> 
                    <button 
                    className='bg-netflixColor mt-8 flex h-14 mb-4 text-lg text-white font-semibold rounded-sm justify-center items-center'
                    onClick={submit}
                    >
                        Subscribe
                    </button>    
                </div>
                
            </div>
            
        </div>

    </section>
  )
}

export default Payment