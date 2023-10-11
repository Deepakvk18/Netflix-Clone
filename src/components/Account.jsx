import Nav from "./Nav"
import profiles from '../utils/profiles'
import ProfileAccordion from "./ProfileAccordion"
import { useState } from "react"
import ProfileEdit from "./ProfileEdit"

export const Account = () => {

  const account = {
    email: 'deepak@gmail.com',
    password: 'deepak',
    card: '1234-5678-9012-3456',
    plan: 'Premium',
    profiles: profiles
  }
  const [openEdit, setOpenEdit] = useState(false)
  const [profile, setProfile] = useState({})

  return (
    <div className='flex bg-white justify-left items-center'>
        <Nav background/> 
        <title>Account Settings - Netflix Clone</title>
          <div className='relative px-[10vw] lg:px-[15vw] w-[100vw] z-0 text-black top-32'>
            <div class="grid grid-cols-1 w-[100%] md:grid-cols-3 lg:grid-cols-4 gap-4">

              <div className="text-gray-700 col-span-1 md:col-span-3 lg:col-span-4 border-b-2 border-gray-500 text-4xl pb-5 flex items-center font-semibold w-[100%] ">
                      Account  <img className="ml-4 mr-2" src="https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg" alt="" /><span className="text-sm font-bold  text-gray-700">Member Since</span>
                    </div>

                    <div className="flex-row justify-between">
                      <div className="text-gray-600 text-2xl">
                            MEMBERSHIP & BILLING
                          <div>
                            <button
                              className="text-gray-600 px-8 py-3 my-2 bg-gray-300 text-sm font-semibold hover:bg-gray-200"
                            >
                              Cancel Membership
                            </button>
                          </div>
                      </div>
                  </div>
                  <div className="col-span-1 lg:col-span-2">
                    <p className="font-semibold text-left text-xl text-black">
                      {account.email}
                    </p>
                    <div className="block text-xl text-gray-600 mt-2">
                      <div className="mt-2">Password: ********</div>
                      <div className="mt-2">Phone: 123-456-7890</div>
                      <div className="mt-4">Card: {account.card}</div>
                    </div>  
                      </div>
                      <div className="font-semibold block text-lg text-blue-400 ">
                            <a href="/change-email" className="block my-2 hover:underline">Change Email</a>
                            <a href="/change-password" className="block my-2 hover:underline">Change Password</a>
                            <a href="/change-phone" className="block my-2 hover:underline">Change Phone</a>
                            <a href="/manage-payment-info" className="block my-2 hover:underline">Manage Payment info</a>
                            <a href="/billing details" className="block my-4 hover:underline">Billing Details</a>
                            <a href="/gift-card" className="block my-4 hover:underline">Redeem Gift Card or Promo Code</a>
                      </div>
                      <div className="flex-row justify-between">
                      <div className="text-gray-600 text-2xl">
                            PLAN DETAILS
                      </div>
                  </div>
                  <div className="col-span-1 lg:col-span-2">
                      <p className="font-semibold text-left text-xl text-black">
                        {account.plan}
                      </p>
                      </div>
                      <div className="font-semibold block text-lg text-blue-400 ">
                            <a href="/change-plan" className="block my-2 hover:underline">Change Plan</a>
                      </div>
                      <div className="flex-row justify-between">
                      <div className="text-gray-600 text-2xl">
                            PROFILE & PARENTAL CONTROLS
                          
                      </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    { account.profiles.map((profile) => (
                      <ProfileAccordion 
                        profile={profile} 
                        setOpenEdit={setOpenEdit}
                        setCurrentProfile={setProfile}
                        
                        />
                        
                    ))}
                  </div>
          </div>
        </div>
        { openEdit && 
          <ProfileEdit 
            setEditProfile={setOpenEdit}
            profile={profile}
            editProfile
          />
        }
    </div>
  )
}
