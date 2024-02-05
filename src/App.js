// App.js

import React, { useContext, useState } from 'react';


import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import TransferPage from './TransferPage';
import { Route, Router, Routes } from 'react-router-dom';
import VerifyPage from './VerifyPage';
import CurrencyRates from './CurrencyRates';
import AccountForm from './AccountForm';
const AuthContext=React.createContext(

);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sendData, setSendData] = useState('');
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
<AuthContext.Provider value={{sendData,setSendData}}>
<Routes>
  <Route path="/login" element={<Login data={data}/>}/>
  <Route path="/registration" element={<Registration/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/TransferPage" element={<TransferPage/>}/>
  <Route path="/verify" element={<VerifyPage/>}/>
  <Route path="/currencies" element={<CurrencyRates/>}/>
  <Route path="/account" element={<AccountForm/>}/>
</Routes>
</AuthContext.Provider>
  );
};

export default App;

export const useAuth = () => {
  return useContext(AuthContext);
};
