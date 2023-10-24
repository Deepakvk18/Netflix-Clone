import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import HomeScreen, { NavLinkPage } from './components/HomeScreen';
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
import Search from './components/Search';
import ShowDetails from './components/ShowDetails';
import Watch from './components/Watch';
import MyList from './components/MyList';
import Subscribed from './components/Subscribed';

function App() {
  const navigate = useNavigate()
  // if (localStorage.getItem('userId')) {
  //   navigate('/browse')
  // }

 

  return (
    <div className="app relative w-full h-full ">
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
              <Route element={<Subscribed />}> 
                <Route exact path='/browse' element={<HomeScreen />} />
                <Route exact path='/discover/:title' element={<NavLinkPage />} />
                <Route exact path='/profiles' element={<Profile/>} />
                <Route exact path='/account' element={<Account />} />
                <Route exact path='/checkout' element={<Checkout />} />
                <Route exact path='/manageProfiles' element={<Profile manageProfiles/>} />
                <Route exact path='/changePlan' element={<ChangePlan />}/>
                <Route exact path='/search' element={<Search />} />
                <Route exact path='/myList' element={<MyList />} />
                <Route exact path='/details/:type/:id' element={<ShowDetails />} />
                <Route exact path='/watch/:type/:id' element={<Watch />} />
              </Route>
            </Route>
          </Routes>
          
    </div>
  );
}

export default App;
