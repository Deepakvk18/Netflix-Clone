import React from 'react'
import { PlanTable } from './Plans'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../features/userSlice'
import { useChangeSubscriptionMutation } from '../features/paymentsApi'
import { useNavigate } from 'react-router-dom'

const ChangePlan = () => {

    const currentSubscription = useSelector(selectUser).plan
    const [changeSubscriptionMutation] = useChangeSubscriptionMutation()
    const navigate = useNavigate()
    
    const subscriptionChange = (planId)=>{
        console.log(planId);
        changeSubscriptionMutation(planId)
              .unwrap()
              .then((res)=>{
                console.log(res);
                navigate('/checkout?changed=true')
              })
              .catch((error)=>{
                console.error(error);
              })
    }



  return (
    <div className='bg-white'>
      <title>Change Subscription - Netflix Clone</title>
        <PlanTable 
            currentSubscription={currentSubscription}
            subscriptionChange={subscriptionChange}
        />
    </div>
  )
}

export default ChangePlan