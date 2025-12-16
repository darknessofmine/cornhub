import type React from 'react';
import { Outlet } from 'react-router-dom';

import './MainLayout.module.css'
import { NavMenu } from '../../nav-menu/NavMenu';


export const MainLayout: React.FC = () => {
  return (
    <>
      <NavMenu/>
      <main>
        <Outlet/>
      </main>
    </>
  );
}
