import { useEffect } from "react"
import { useState  } from "react"

const PlanCard = ({ data, changePlan, currentPlan, currentSubscription }) => {

    const [active, setActive] = useState(false)

    const handleClick = () => {
        changePlan(data.id)
        setActive(!active)
    }

    useEffect(() => {
        if (currentPlan === data.id) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [currentPlan])

  return (
    <div className={`mb-4 m-4 lg:max-w-[21%] md:w-[45%] w-full cursor-default pt-8 justify-center ${active ? 'text-netflixColor': 'bg-white'}`} >
        <div className="block rounded-md h-[100%] bg-white ring-netflixColor ring-1" onClick={handleClick}>
            <div className={`p-2 flex flex-wrap flex-col justify-center items-center ${active && 'bg-netflixMsgColor text-white'} ${currentSubscription?.id === data.id ? 'bg-black text-white' : ''}`}>
                    <h2 className="text-4xl my-2 font-semibold">
                        {data?.name} <span className="text-sm">{ currentSubscription?.id === data.id && '(Current)'}</span>
                    </h2>
                    <h3 className="text-2xl">
                    ₹ {'199'} /Month
                    </h3>
                
            </div>
            <div className={`flex p-4 text-sm text-left ${active ? 'text-netflixColor': 'text-gray-500'} list-decimal`}>
                <ul>
                    { data.features.map((feature)=>(
                        <li className="mb-2">
                            {feature.name}
                        </li>
                    ))}
                </ul>
            </div>
            
        
        
        </div>
        
    </div>
  )
}

export default PlanCard