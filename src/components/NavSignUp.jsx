import netflixLogo from './assets/images/Netflix-Brand-Logo.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'
import { selectEmail } from '../features/userSlice'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { logout } from '../features/userSlice'
import { useLogoutMutation } from '../features/authApi'

const NavSignUp = () => {

    const navigate = useNavigate()
    const email = useSelector(selectEmail);
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
        {email ? (
            <a onClick={handleLogout} className='text-2xl font-bold ml-auto mr-20'>
                Sign out
            </a>
        ) : (
            <a href='/login' className='text-2xl font-bold ml-auto mr-20'>
                Sign In
            </a>
        )}
    </nav>
  )
}

export default NavSignUp