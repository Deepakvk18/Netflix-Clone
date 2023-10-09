import React from 'react'
import { PlanTable } from './Plans'

const ChangePlan = () => {

    const currentSubscription = {id: 'prod_OkeNQMUNLzTKUS'}

  return (
    <div className='bg-white'>
        <PlanTable 
            currentSubscription={currentSubscription}
        />
    </div>
  )
}

export default ChangePlan