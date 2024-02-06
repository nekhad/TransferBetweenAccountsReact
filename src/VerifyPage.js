import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './App';
import './VerifyPage.css';
const VerifyPage = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { sendData } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9292/api/v1/auth/verify', {
        email: sendData,
        verificationCode: verificationCode
      });
      navigate('/login');
      console.log('Verification successful:', response.data);
    } catch (error) {
      setError('Verification failed. Please check your verification code and try again.');
      console.error('Verification failed:', error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Verify Your Email</h2>
        <p>An email with a verification code has been sent to {email}. Please enter the code below:</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleVerify}>
          <div>
            <label>Verification Code:</label>
            <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          </div>
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );

};

export default VerifyPage;
