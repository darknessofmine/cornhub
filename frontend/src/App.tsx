import type React from 'react' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'
import { HomePage } from './components/home-page/HomePage';
import { LoginPage } from './components/login-page/LoginPage';
import { MainLayout } from './components/common/main-layout/MainLayout';
import { PageNotFound } from './components/page-not-found/PageNotFound';
import { ProtectedRoute } from './components/common/protected-route/ProtectedRoute';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />

        <Route path='/' element={<MainLayout/>}>
          <Route path='/' element={<ProtectedRoute/>}>
            <Route path='/' element={<HomePage/>}/>
          </Route>
        </Route>

        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
