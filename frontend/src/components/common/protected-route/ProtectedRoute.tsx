import type React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


export const ProtectedRoute: React.FC = () => {
    const location = useLocation();
    const isLoggedIn = true;
    
    return isLoggedIn ? (
        <Outlet/>
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
}
