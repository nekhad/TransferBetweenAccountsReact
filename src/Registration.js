import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from './App';
import './Registration.css'; // Import your CSS file

const Registration = ({ handleRegistration }) => {
  const [firstname, setName] = useState('');
  const [lastname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setSendData}=useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the registration API
      const response = await axios.post('http://localhost:9292/api/v1/auth/register', {
        firstname,
        lastname,
        email,
        password
      });

      // Redirect to the login page upon successful registration
      navigate('/verify');
    } catch (error) {
      // Handle error if registration fails (e.g., email already exists)
      console.error('Registration failed:', error.response.data.message);
      // Handle error message (display to the user, etc.)
    }
  };
  useEffect(() => {
    setSendData(email);
  }, [email]);
  return (
    <div className="container">
      <h2>Registration</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={firstname} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Surname:</label>
          <input type="text" value={lastname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
  
};

export default Registration;
