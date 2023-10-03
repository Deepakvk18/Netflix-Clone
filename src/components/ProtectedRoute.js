import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../features/userSlice";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const auth = localStorage.getItem('userId');

    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;