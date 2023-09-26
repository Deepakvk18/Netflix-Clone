import React from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import LoginScreen from './components/LoginScreen';
import SignInScreen from './components/SignInScreen';

function App() {

  const user = {};

  return (
    <div className="app w-full h-full">
      
      <Router>

        {/* { !user ? 
          <LoginScreen /> :( */}
          <Routes>
            <Route exact path='/' element={<LoginScreen />} />
            <Route exact path='/login' element={<SignInScreen />} />
            <Route exact path='/browse' element={<HomeScreen />} />
          </Routes>
      
        {/* ) } */}
        
        </Router>
    </div>
  );
}

export default App;
