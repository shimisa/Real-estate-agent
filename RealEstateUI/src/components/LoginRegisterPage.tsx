import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig'; // Import the configured Axios instance
import { loginUser, registerUser } from '../services/api'; // Import the API functions
import qs from 'qs'; // Import qs for URL-encoded data formatting

function LoginRegisterPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Simulate a logged-in state (replace with actual authentication logic)
  const isLoggedIn = false; // Change this to true if the user is logged in

  if (isLoggedIn) {
    navigate('/'); // Redirect to the dashboard if already logged in
    return null;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (isLogin) {
        const response = await loginUser({ username: email, password });
        console.log('Login successful:', response.data);
        setSuccessMessage('Login successful! Welcome back.');
        setError(null);
        navigate('/'); // Redirect to the dashboard
      } else {
        const data = await registerUser( { firstName, lastName, email, password });
        console.log('Registration successful:', data);
        setSuccessMessage('Registration successful! Please check your email to confirm your account.');
        setError(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      setSuccessMessage(null);
      console.error('Error:', err);
    }
  };

  return (
    <div className="login-container">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default LoginRegisterPage;