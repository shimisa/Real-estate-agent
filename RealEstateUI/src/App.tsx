import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginRegisterPage from './components/LoginRegisterPage';
import DashboardPage from './components/DashboardPage';
import ConfirmEmailPage from './components/ConfirmEmailPage';
import NavigationMenu from './components/NavigationMenu';
import { Box } from '@mui/material';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavigationMenu />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginRegisterPage />} />
            <Route path="/confirm-email" element={<ConfirmEmailPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;