import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegisterPage from './components/LoginRegisterPage';
import DashboardPage from './components/DashboardPage';
import ConfirmEmailPage from './components/ConfirmEmailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} /> {/* Dashboard is now the main page */}
        <Route path="/login" element={<LoginRegisterPage />} /> {/* Login/Register page */}
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;