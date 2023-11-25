import React from 'react';
import DressSuggestions from './Componets/DressSuggestions';
import Registor from './Componets/Registor';
import Login from './Componets/Login';
import { Route, Routes } from 'react-router-dom';
import ResetPassword from './Componets/ResetPassword';
import SetNewPassword from './Componets/setNewPassword';
import Dashboard from './Componets/Dashboard';
import Home from './Componets/Home';
import NavBar from './Componets/NavBar';
import Profile from './Componets/Profile';

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/signup" element={<Registor />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/forget-pass" element={<ResetPassword />} />
        <Route path="/reset" element={<SetNewPassword />} />

       
          <Route path='/' element={<NavBar/>}>
           <Route path="home" element={<Home />}/>                 
          <Route path="DressSuggestions" element={<DressSuggestions />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="dashboard" element={<Dashboard />} />
          </Route>
       
      </Routes>
    </div>
  );
};

export default App;
