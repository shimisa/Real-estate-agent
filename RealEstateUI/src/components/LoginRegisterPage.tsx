import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { Box, Container, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function LoginRegisterPage() {
  const { checkAuth } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const response = await loginUser({ username: email, password });
        console.log('Login successful:', response.data);
        await checkAuth(); // Add this line to refresh user data
        setSuccessMessage('Login successful! Welcome back.');
        setError(null);
        navigate('/');
      } else {
        const data = await registerUser({ firstName, lastName, email, password });
        console.log('Registration successful:', data);
        setSuccessMessage(data.message);
        setError(null);
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred');
      setSuccessMessage(null);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1,
        mt: 8 // Add margin top to account for fixed navigation
      }}
    >
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : (isLogin ? 'Login' : 'Register')}
            </button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} disabled={isLoading}>
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </button>
        </div>
      </Container>
    </Box>
  );
}

export default LoginRegisterPage;