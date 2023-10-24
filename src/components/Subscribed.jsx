import { useSelector } from "react-redux/es/hooks/useSelector"
import { Navigate, Outlet } from 'react-router-dom';
import { selectUser } from '../features/userSlice'

const Subscribed = () => {

    const user = useSelector(selectUser)

    console.log("User", user);

  return localStorage.getItem('refreshToken') ? (!user?.plans || user?.plans?.price === 0 ? <Navigate to='/signup/plans' /> : <Outlet />) : <Navigate to='/login' />;
}

export default Subscribed