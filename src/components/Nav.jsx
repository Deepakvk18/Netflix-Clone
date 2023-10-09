import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import netflixLogo from './assets/images/Netflix-Brand-Logo.png'
import ProfilePopover from './ProfilePopOver'
import MigrateProfile from './MigrateProfile'

function Nav({ links, background }) {

    const [show, handleShow] = useState(false)
    const [searchBar, setSearchBar] = useState(false)
    const [searchQuery, setSearchQuery] = useSearchParams()
    const [migrateProfile, setMigrateProfile] = useState(false)
    const navigate = useNavigate()
    
    console.log(searchQuery);
    const transitionNavBar = () => {
        if (window.scrollY > 50){
            handleShow(true)
        }else{
            handleShow(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", transitionNavBar)
        return () => window.removeEventListener("scroll", transitionNavBar)
    }, [])

    const showSearchBar = async () => {
        setSearchBar(true)
        await new Promise((resolve) => setTimeout(resolve, 100));
        const element = document.getElementById('searchBar')
        element.focus()
    }

    const changeSearch = (e) => {
        setSearchQuery(e.target.value)
        console.log(searchQuery);
        navigate(`/browse?${createSearchParams({query: e.target.value})}`)
    }

  return (
    <nav className={`fixed items-center py-1 w-full z-10 top-0 transition-all ease-in-out delay-150 duration-1000 ${show && 'bg-[#111] z-50'} ${background && 'bg-[#111]'}`}>
        <div className='flex relative inset-0 space-between items-center'>
            <img
                className='object-contain cursor-pointer ml-10 mr-5'
                src={netflixLogo}
                alt='logo'
                width={100}
            />

            { links &&
                <div className='w-full hidden lg:flex h-10 items-center'>
                    <div className={`justify-between  float-left ${searchBar ? 'mr-32': 'mr-96'}`}>
                        <Link to='/browse ' className='nav-links'>Home</Link>
                        <Link to='/tv-shows' className='nav-links'>TV Shows</Link>
                        <Link to='/movies' className='nav-links'>Movies</Link>
                        <Link to='/new' className='nav-links'>New & Popular</Link>
                        <Link to='/myList' className='nav-links'>My List</Link>
                    </div>
                    { searchBar && 
                        <input
                            className='transition-all ease-out delay-150 duration-1000 bg-[#333] text-white rounded-sm h-10 w-[400px] px-2 py-1 ring-slate-400 ring-2 mr-4'
                            id='searchBar'
                            value={searchQuery}
                            onChange={(e)=>changeSearch}
                            placeholder='Titles, people, genres'
                            onBlur={()=>setSearchBar(false)}
                        />
                    }
                    <div className={`float-right ${searchBar ? 'ml-0': 'ml-44'}`}>
                        <FontAwesomeIcon 
                            className='mr-4 cursor-pointer'
                            icon={faMagnifyingGlass} 
                            size='lg'
                            style={{color: "#fff",}} 
                            onClick={showSearchBar}
                        />
                        <Link to='/children' className='nav-links mr-4'>Children</Link>
                        <FontAwesomeIcon 
                            icon={faBell} 
                            className='mr-4 cursor-pointer'
                            style={{color: "#fff",}}
                            width={20}
                        />
                    </div>
                </div>
                
            }
            
            <ProfilePopover setMigrateProfile={setMigrateProfile}/>
            { migrateProfile && <MigrateProfile setMigrateProfile={setMigrateProfile}/> }

        </div>
        
    </nav>
  )
}


export default Nav