import { getProfileImgUrl } from "../utils/profiles"

const ProfileAccordion = ({ profile, setOpenEdit, setCurrentProfile }) => {
    
    console.log(profile.children);
  return (
    <div className="flex my-4" onClick={()=>setCurrentProfile(profile)}>
        <img 
            src={getProfileImgUrl(profile)} 
            alt="profile" 
            className="rounded-xl"
            width={80}
        />
        <div className="m-4 items-center w-full justify-left">
            <p>Name: {profile.name}</p>
            <p>Child?: {profile.children.toString()}</p>
        </div>
        <button onClick={()=>setOpenEdit(true)} className="float-right text-blue-400 text-semibold hover:underline">
            Change
        </button>
    </div>
  )
}

export default ProfileAccordion