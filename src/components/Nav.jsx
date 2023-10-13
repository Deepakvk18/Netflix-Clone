import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import netflixLogo from './assets/images/Netflix-Brand-Logo.png'
import ProfilePopover from './ProfilePopOver'
import MigrateProfile from './MigrateProfile'

function Nav({ links, background, searchParams }) {

    const [show, handleShow] = useState(false)
    const [searchBar, setSearchBar] = useState(false)
    const [migrateProfile, setMigrateProfile] = useState(false)
    const [searchParam, setSearchParam] = useState('')
    const navigate = useNavigate()

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

    const onKeyUp = (e) => {
        console.log('keyUp', e.key);
        if (e.key === 'Enter') {
            console.log(searchParam);
            navigate(`/search?${createSearchParams({query: e.target.value})}`)
        }
    }

  return (
    <nav className={`fixed items-center py-1 w-full z-5000 top-0 transition-all ease-in-out delay-150 duration-1000 ${show && 'bg-[#111]'} ${background && 'bg-[#111]'}`}>
        
        <div className='flex relative inset-0 space-between items-center'>
            <a href="/">
                <img
                    className='object-contain cursor-pointer ml-10 mr-5'
                    src={netflixLogo}
                    alt='logo'
                    width={100}
                />
            </a>

            { links &&
                <div className='w-full hidden lg:flex h-10 items-center'>
                    <div className={`justify-between  float-left ${searchBar ? 'mr-32': 'mr-96'}`}>
                        <Link to='/browse' className='nav-links'>Home</Link>
                        <Link to='/discover/TV' className='nav-links'>TV Shows</Link>
                        <Link to='/discover/Movie' className='nav-links'>Movies</Link>
                        <Link to='/discover/Popular' className='nav-links'>New & Popular</Link>
                        <Link to='/myList' className='nav-links'>My List</Link>
                    </div>
                    { searchBar && 
                        <input
                            className='transition-all ease-out delay-150 duration-1000 bg-[#333] text-white rounded-sm h-10 w-[400px] px-2 py-1 ring-slate-400 ring-2 mr-4'
                            id='searchBar'
                            value={searchParams ? searchParams : searchParam}
                            onChange={(e)=>setSearchParam(e.target.value)}
                            placeholder='Titles, people, genres'
                            onBlur={()=>setSearchBar(false)}
                            onKeyUp={onKeyUp}
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
                        <a onClick={()=>{}} className='cursor-pointer nav-links mr-4'>Children</a>
                        <FontAwesomeIcon 
                            icon={faBell} 
                            className='mr-4 cursor-pointer'
                            style={{color: "#fff",}}
                            width={20}
                        />
                    </div>
                </div>
            }
            { links &&
                <div className='flex lg:hidden text-white'>
                    <div>
                        <button id="hamburger-button" class="w-8 h-8 m-4 text-white">
                            {/* <!-- Add your hamburger icon here --> */}
                        </button>
                    </div>
                    <div id="hamburger-menu" class="hidden xl:flex items-center">
                        <a href="/browse" class="nav-links">Home</a>
                        <a href="/discover/TV" class="nav-links">TV Shows</a>
                        <a href="/discover/Movie" class="nav-links">Movies</a>
                        <a href="/discover/Popular" class="nav-links">New & Popular</a>
                        <a href="/myList" class="nav-links">My List</a>
                        <button id="search-button" class="ml-4 text-white">
                            {/* <!-- Add your search icon here --> */}
                        </button>
                        <a class="nav-links ml-4">Children</a>
                        <button id="bell-button" class="ml-4 text-white">
                            {/* <!-- Add your bell icon here --> */}
                        </button>
                    </div>
                    <div id="search-bar" class="hidden xl:flex">
                        <input
                            class="bg-[#333] text-white rounded-sm h-10 w-64 px-2 py-1 ring-slate-400 ring-2 mr-4"
                            id="searchBar"
                            value={searchParams ? searchParams : searchParam}
                            onChange={(e) => setSearchParam(e.target.value)}
                            placeholder="Titles, people, genres"
                            onBlur={() => setSearchBar(false)}
                            onKeyUp={onKeyUp}
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