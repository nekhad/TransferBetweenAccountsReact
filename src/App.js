// App.js

import React, { useState } from 'react';


import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import { Route, Router, Routes } from 'react-router-dom';
import VerifyPage from './VerifyPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState({
    name:'salam',
    onchange: (sa) => {
      console.log(sa);
    }
  });

  const handleLogin = (credentials) => {
    // Perform login authentication here (not implemented in this example)
    console.log('Logging in with:', credentials);
    setLoggedIn(true);
  };

  const handleRegistration = (userData) => {
    // Perform registration logic here (not implemented in this example)
    console.log('Registering user:', userData);
  };

  return (

<Routes>
  <Route path="/login" element={<Login data={data}/>}/>
  <Route path="/registration" element={<Registration/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/verify" element={<VerifyPage/>}/>
</Routes>

  );
};

export default App;
