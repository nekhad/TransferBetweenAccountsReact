import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import TransferPage from './TransferPage';
import VerifyPage from './VerifyPage';
import CurrencyRates from './CurrencyRates';
import AccountForm from './AccountForm';
import Accounts from './Accounts';

const AuthContext = React.createContext();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogin = (credentials) => {
    console.log('Logging in with:', credentials);
    setLoggedIn(true);
  };

  const handleRegistration = (userData) => {
    console.log('Registering user:', userData);
  };

  return (
    <AuthContext.Provider value={{ loggedIn }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verify" element={<VerifyPage />} />
        {loggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/TransferPage" element={<TransferPage />} />
            <Route path="/currencies" element={<CurrencyRates />} />
            <Route path="/account" element={<AccountForm />} />
            <Route path="/accounts" element={<Accounts />} />
          </>
        ) : null}
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;

export const useAuth = () => {
  return useContext(AuthContext);
};
