import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig'; // Import the configured Axios instance

function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/check-auth'); // Use the configured Axios instance
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout'); // Use the configured Axios instance
      setIsLoggedIn(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="menu-bar">
        <h2>Menu</h2>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          {!isLoggedIn && (
            <li><Link to="/login">Login/Register</Link></li>
          )}
        </ul>
      </aside>
      <main className="dashboard-content">
        <h1>Welcome to the Dashboard</h1>
        {isLoggedIn ? (
          <>
            <p>You are logged in. Welcome back!</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>Please log in to access more features.</p>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;