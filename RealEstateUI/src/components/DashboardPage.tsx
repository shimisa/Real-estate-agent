import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { isLoggedIn, userData } = useAuth();

  return (
    <Container sx={{ mt: 2 }}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        {isLoggedIn ? (
          <Typography variant="body1">
            You are logged in. Welcome back{userData ? `, ${userData.firstName}!` : '!'}
          </Typography>
        ) : (
          <Typography variant="body1">Please log in to access more features.</Typography>
        )}
      </Box>
    </Container>
  );
}

export default DashboardPage;