import { useEffect, useState } from 'react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { faBell } from '@fortawesome/free-solid-svg-icons'

function Nav({ links }) {

    const [show, handleShow] = useState(false)
    const [searchBar, setSearchBar] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

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

  return (
    <nav className={`fixed items-center py-1 w-full z-10 top-0 transition-all ease-in-out delay-150 duration-1000 ${show && 'bg-[#111]'}`}>
        <div className='flex space-between items-center'>
            <img
                className='object-contain cursor-pointer ml-10 mr-5'
                src='https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png'
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
                        <Link to='/browseByLanguages' className='nav-links'>Browse By Languages</Link>
                    </div>
                    { searchBar && 
                        <input
                            className='transition-all ease-out delay-150 duration-1000 bg-[#333] text-white rounded-sm h-10 w-[400px] px-2 py-1 ring-slate-400 ring-2 mr-4'
                            id='searchBar'
                            value={searchQuery}
                            onChange={(e)=>setSearchQuery(e.target.value)}
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
            <div className='fixed flex right-20 group items-center cursor-pointer'>
                <img
                    className='rounded-md cursor-pointer'
                    src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                    alt='profile'
                    width={33}
                />
                <FontAwesomeIcon 
                    className='m-2 cursor-pointer hover:transform hover:rotate-180 transition-all ease-in-out delay-150 duration-300 group-hover:rotate-180'
                    icon={faCaretDown}
                    size='sm' 
                    style={{color: '#fff'}} 
                />
            </div>
            
        </div>
        
    </nav>
  )
}

export default Nav