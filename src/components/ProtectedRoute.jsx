import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUserId } from "../features/userSlice";
import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshQuery } from "../features/authApi";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/userSlice";

const ProtectedRoute = () => {

    const auth = useSelector(selectUserId);
    const dispatch = useDispatch();

    if (auth) {
        return <Outlet />
    }

    if (localStorage.getItem('userId')) {
        try{
            const refresh = useRefreshQuery();
            dispatch(login( refresh ))
        } catch(error){
            console.error(error);
            logout()
        }
    }

    const auth_after_refresh = useSelector(selectUserId);

    console.log("Private", auth_after_refresh);

    return auth_after_refresh ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;