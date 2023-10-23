import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const auth = localStorage.getItem('refreshToken')       
        
    // return auth_after_refresh ? <Outlet /> : <Navigate to="/login" />;
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;