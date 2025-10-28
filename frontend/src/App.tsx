import type React from 'react' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'
import { HomePage } from './components/home-page/HomePage';
import { LoginPage } from './components/login-page/LoginPage';
import { MainLayout } from './components/main-layout/MainLayout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/login' element={<LoginPage/>} />

        <Route path='/' element={<MainLayout/>}>
          <Route path='/' element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
