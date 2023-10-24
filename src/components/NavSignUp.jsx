import netflixLogo from './assets/images/Netflix-Brand-Logo.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../features/userSlice'
import { useLogoutMutation } from '../features/authApi'

const NavSignUp = () => {

    const navigate = useNavigate()
    const auth = localStorage.getItem('refreshToken')
    const dispatch = useDispatch()
    const [logoutApi] = useLogoutMutation()
    

    const handleLogout = (e) => {
        e.preventDefault()
        logoutApi()
        dispatch(logout())
        navigate('/login')
    }

  return (
    <nav className='flex items-center shadow-md'>
        <LazyLoadImage
            src={netflixLogo}
            className='object-fit ml-10 -top-2 cursor-pointer float-left'
            onClick={()=>navigate('/')}
            width={180}
        />
        {auth ? (
            <p onClick={handleLogout} className='text-2xl cursor-pointer font-bold ml-auto mr-20'>
                Sign out
            </p>
        ) : (
            <Link to='/login' className='text-2xl font-bold ml-auto cursor-pointer mr-20'>
                Sign In
            </Link>
        )}
    </nav>
  )
}

export default NavSignUp