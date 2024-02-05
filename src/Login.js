import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9292/api/v1/auth/authenticate', {
        email: email,
        password: password
      });

      // Assuming the server responds with a token upon successful login
      const token = response.data.token;

      // Store the token in local storage or session storage
      localStorage.setItem('token', token);

      // Redirect to a different page upon successful login
      navigate('/dashboard');
    } catch (error) {
      // Handle error when login fails
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
