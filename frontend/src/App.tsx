import type React from 'react' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'
import { HomePage } from './components/home-page/HomePage';
import { MainLayout } from './components/common/main-layout/MainLayout';
import { PageNotFound } from './components/page-not-found/PageNotFound';
import { ProtectedRoute } from './components/common/protected-route/ProtectedRoute';

import { ForgotPasswordPage } from './components/auth/forgot-password-page/ForgotPasswordPage';
import { LoginPage } from './components/auth/login-page/LoginPage';
import { SignupPage } from './components/auth/signup-page/SignupPage';
import { VerificationPage } from './components/auth/verification-page/VerificationPage';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/forgot-password' element={<ForgotPasswordPage/>} />
        <Route path='/forgot-password/verification' element={<VerificationPage/>} />

        <Route path='/' element={<MainLayout/>} >

          <Route path='/' element={<ProtectedRoute/>} >
            <Route path='/' element={<HomePage/>} />
          </Route>
  
        </Route>

        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
