import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import HomeScreen from './components/HomeScreen';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import LoginScreen from './components/SignUpScreen';
import SignInScreen from './components/SignInScreen';
import ProtectedRoute from './components/ProtectedRoute';
import { Account } from './components/Account';
import { Checkout } from './components/Checkout';
import PasswordScreen from './components/PasswordScreen';
import Plans from './components/Plans';
import Payment from './components/Payment';
import Profile from './components/Profile';
import ChangePlan from './components/ChangePlan';

function App() {

  if (localStorage.getItem('userId')) {
    new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <div className="app w-full h-full">
          <Routes>
            <Route exact path='/' element={<LoginScreen />} />
            <Route exact path='/login' element={<SignInScreen />} />
            <Route exact path='/signUp'  >
              <Route path='/signUp' element={<PasswordScreen />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/signUp/plans' element={<Plans />} />
                <Route path='/signUp/payment' element={<Payment />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute />} >
              <Route exact path='/browse' element={<HomeScreen />} />
              <Route exact path='/account' element={<Account />} />
              <Route exact path='/checkout' element={<Checkout />} />
              <Route exact path='/manageProfiles' element={<Profile />} />
              <Route exact path='/changePlan' element={<ChangePlan />}/>
            </Route>
          </Routes>
    </div>
  );
}

export default App;
