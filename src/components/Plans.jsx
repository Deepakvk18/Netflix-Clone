import NavSignUp from "./NavSignUp"
import { useState, useEffect } from "react"
import { useGetProductsQuery } from "../features/paymentsApi"
import PlanCard from "./PlanCard"
import { useNavigate } from "react-router-dom"

const Plans = () => {

    const [showConfirmation, setShowConfirmation] = useState(true)

    const onNext = () => {
        setShowConfirmation(false)
    }

  return (
    <section className="relative bg-white">
        <title>Sign Up - Netflix Clone</title>
        <NavSignUp />
        {showConfirmation ? <Confirmation submit={onNext} /> : <PlanTable/>}
    </section>
  )
}

export const PlanTable = ({ currentSubscription, subscriptionChange }) => {

    const { data: plans, error, isError, isLoading } = useGetProductsQuery()
    const [currentPlan, setCurrentPlan] = useState('')
    const navigate = useNavigate()

    const changePlan = (priceId)=>{
        if (currentPlan === priceId) {
            setCurrentPlan('')
        } else {
            setCurrentPlan(priceId)
        }
    }

    const submit = (e) => {
        e.preventDefault()
        navigate(`/signUp/payment?plan=${currentPlan}`)
    }
    
    return (
        <div className="relative inset-0 flex justify-left px-[5vw] items-center">
            
            <div className="block w-full mt-4">
                { !currentSubscription ? (
                    <div className="block text-center">
                    <div className='text-xl w-full text-left font-mono'>
                        STEP <b>2</b> OF <b>3</b>
                    </div>
                        <br/>
                    <div className='text-4xl -mt-4 w-full text-left flex-wrap font-semibold'>
                        Choose the Plan that's right for you
                    </div>
                        <br/>
                    <div className='flex text-left text-lg mb-2'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-netflixColor flex mr-4" data-name="Checkmark" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                        Watch all you want. Ad-free.

                    </div>
                    <div className='flex text-left text-lg mb-2'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-netflixColor flex mr-4" data-name="Checkmark" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                        Recommendations just for you.
                    </div>
                    <div className='flex text-lg text-left mb-2'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-netflixColor flex mr-4" data-name="Checkmark" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                        Change or cancel your plan anytime.
                    </div>
                </div>
                ) : (
                    <div>
                        Your plan will be changed right away. You will be charged the new price on your next billing date. You will only be charged for the remaining days in the month and any previous charges will be credited.
                    </div>
                )}
                <div className="flex flex-row flex-wrap w-full">
                    { plans?.data.map((plan) => (
                        <PlanCard 
                            key={plan?.id} 
                            data={plan} 
                            changePlan={changePlan} 
                            currentPlan={currentPlan} 
                            currentSubscription={currentSubscription}
                        />
                    ))}
                </div>
                <div className="block">
                    <span className="flex-wrap text-sm">
                    HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.
                    Only people who live with you may use your account. 
                    <br/>Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.
                    </span>
                    {! currentSubscription && (
                        <div className="flex justify-center items-center">
                        <button 
                            className='bg-netflixColor mt-8 h-14 w-[30vw] mb-4 text-2xl text-white font-semibold rounded-sm justify-center items-center'
                            onClick={submit}
                        >
                            Next
                        </button>
                    </div>
                    )}
                    
                    {currentSubscription && currentPlan && (currentPlan !== currentSubscription) && (
                        <div className=" flex w-full items-center justify-center">
                            <button className="bg-netflixColor mt-8 h-14 w-[30vw] mb-4 md:text-2xl text-white font-semibold rounded-sm text-lg justify-center items-center" onClick={()=>subscriptionChange(currentPlan)}>
                                Change Plan
                            </button>
                        </div>
                    )}
            
                </div>
            </div>
        </div>
    )
}

export const Confirmation = ({ submit }) =>{
    return (
        <div className="relative inset-0 flex justify-center items-center">
            <div className="block mt-16 md:w-[40vw] lg:w-[23vw]">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Checkmark.png"
                    alt="plans"
                    width={60}
                    className="m-auto"
                />
                <div className="block text-center m-auto">
                    <div className='text-xl w-full mt-2 text-center font-mono'>
                        STEP <b>2</b> OF <b>3</b>
                    </div>
                        <br/>
                    <div className='text-4xl -mt-4 w-full text-center flex-wrap font-semibold'>
                        Choose Your Plan
                    </div>
                        <br/>
                    <div className='flex text-left text-lg mb-2'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-netflixColor flex mr-4" data-name="Checkmark" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                            No Commitments, Cancel Anytime
                    </div>
                    <div className='flex text-left text-lg mb-2'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-netflixColor flex mr-4" data-name="Checkmark" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                            Everything on Netflix for one low price.
                    </div>
                    <div className='flex text-lg text-left mb-2'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-netflixColor flex mr-4" data-name="Checkmark" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                            No ads and no extra fees. Ever.
                    </div>
                    <button 
                        className='bg-netflixColor mt-8 h-14 w-full mb-4 text-2xl text-white font-semibold rounded-sm justify-center items-center'
                        onClick={submit}
                    >
                        Next
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Plans