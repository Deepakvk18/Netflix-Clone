import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import LoginScreen from './components/LoginScreen';
import SignInScreen from './components/SignInScreen';
import ProtectedRoute from './components/ProtectedRoute';
import { Account } from './components/Account';

function App() {

  if (localStorage.getItem('userId')) {
    new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <div className="app w-full h-full">
          <Routes>
            <Route exact path='/' element={<LoginScreen />} />
            <Route exact path='/login' element={<SignInScreen />} />
            <Route element={<ProtectedRoute />} >
              <Route exact path='/browse' element={<HomeScreen />} />
              <Route exact path='/account' element={<Account />} />
            </Route>
          </Routes>
    </div>
  );
}

export default App;
