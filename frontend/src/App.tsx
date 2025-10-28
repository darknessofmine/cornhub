import type React from 'react' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'
import { MainLayout } from './components/main-layout/MainLayout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/login' element={<> loginPage </>} />

        <Route path='/' element={<MainLayout/>}>
          <Route path='/' element={<>homePage</>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
