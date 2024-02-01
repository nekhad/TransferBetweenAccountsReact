// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const VerifyPage = () => {
//   const [verificationCode, setVerificationCode] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Make a POST request to the verification API
//       const response = await axios.post('http://localhost:9292/api/v1/auth/verify', {
//         code: verificationCode
//       });

//       // If verification is successful, redirect to the login page
//       navigate('/login');
//     } catch (error) {
//       // Handle error if verification fails
//       console.error('Verification failed:', error.response.data.message);
//       // Handle error message (display to the user, etc.)
//     }
//   };

//   return (
//     <div>
//       <h2>Verification</h2>
//       <p>Please enter the verification code sent to your email or phone number.</p>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Verification Code:</label>
//           <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
//         </div>
//         <button type="submit">Verify</button>
//       </form>
//     </div>
//   );
// };

// export default VerifyPage;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyPage = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the verify API
      const response = await axios.post('http://localhost:9292/api/v1/auth/verify', {
        email: email,
        verificationCode: verificationCode
      });
      navigate('/login');
      // Handle success (e.g., navigate to dashboard)
      console.log('Verification successful:', response.data);
    } catch (error) {
      // Handle error if verification fails
      setError('Verification failed. Please check your verification code and try again.');
      console.error('Verification failed:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Verify Your Email</h2>
      <p>An email with a verification code has been sent to {email}. Please enter the code below:</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleVerify}>
        <div>
          <label>Verification Code:</label>
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyPage;
