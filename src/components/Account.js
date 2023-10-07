import Nav from "./Nav"
import profiles from '../profiles'

export const Account = () => {

  const account = {
    email: 'deepak@gmail.com',
    password: 'deepak',
    card: '1234-5678-9012-3456',
    plan: 'Premium',
    profiles: profiles
  }


  return (
    <div className='flex bg-white w-[100vw] justify-left items-center'>
        <Nav background/> 
          <div className='relative block px-[15vw] w-[100vw] z-10 m-auto text-black top-32'>
            <div className="m-auto w-[100%] flex flex-wrap flex-row">
                <div className="text-gray-700 border-b-2 border-gray-500 text-4xl pb-5 flex items-center font-semibold w-[100%] ">
                  Account  <img className="ml-4 mr-2" src="https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg" alt="" /><span className="text-sm font-bold  text-gray-700">Member Since</span>
                </div>
                <div className="flex flex-wrap flex-row justify-between">
                  <div className="text-gray-600 text-2xl">
                        Membership & Billing
                      <div>
                        <button
                          className="text-gray-600 px-8 py-3 my-2 bg-gray-300 text-sm font-semibold hover:bg-gray-200"
                        >
                          Cancel Membership
                        </button>
                      </div>
                      <div className="font-bold text-lg text-black">
                        {account.email}
                      </div>
                  </div>
                </div>
          </div>    
        </div>
    </div>
  )
}
