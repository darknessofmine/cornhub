import type React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';


export const AuthRoute: React.FC = () => {
  const location = useLocation();
  const isLoggedIn: boolean = false;

  if (!isLoggedIn)
    return <Outlet/>
  else
    return <Navigate to={'/'} state={ { from: location } } replace/>
}