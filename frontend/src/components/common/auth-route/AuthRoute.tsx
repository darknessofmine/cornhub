import type React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { NotificationPopupProvider } from '../../../contexts/NotificationPopupContext';


export const AuthRoute: React.FC = () => {
  const location = useLocation();
  const isLoggedIn: boolean = false;

  if (!isLoggedIn)
    return (
      <NotificationPopupProvider>
        <Outlet/>
      </NotificationPopupProvider>
    );
  else
    return <Navigate to={'/'} state={ { from: location } } replace/>
}