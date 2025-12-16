import type React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


export const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const isLoggedIn: boolean = localStorage.getItem('authToken') === 'token';
  
  if (isLoggedIn)
    return <Outlet/>
  else
    return <Navigate to='/login' state={ { from: location } } replace/>
}
