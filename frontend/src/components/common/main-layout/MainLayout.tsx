import type React from 'react';
import { Outlet } from 'react-router-dom';

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
