import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box, 
  Container, 
  Stack,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for nav links
const NavLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  marginLeft: '20px',
  '&:hover': {
    textDecoration: 'underline',
  },
});

interface UserData {
  firstName: string;
  lastName: string;
}

function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Check login status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/check-auth'); // Use the configured Axios instance
        setIsLoggedIn(response.data.isLoggedIn);
        if (response.data.isLoggedIn && response.data.user) {
          setUserData(response.data.user);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout'); // Use the configured Axios instance
      setIsLoggedIn(false);
      setUserData(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          {/* Left section - Logo */}
          <Typography variant="h6" component="div" sx={{ width: '200px' }}>
            Real Estate
          </Typography>
          
          {/* Middle section - Navigation links */}
          <Stack 
            direction="row" 
            spacing={3} 
            sx={{ 
              flexGrow: 1,
              justifyContent: 'center'
            }}
          >
            <NavLink to="/dashboard">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </Stack>
          
          {/* Right section - Avatar or Login link */}
          <Box sx={{ width: '200px', display: 'flex', justifyContent: 'flex-end' }}>
            {isLoggedIn && userData ? (
              <>
                <IconButton 
                  onClick={handleMenuOpen}
                  sx={{ p: 0.5 }}
                >
                  <Avatar sx={{ width: 40, height: 40, bgcolor: '#1565c0' }}>
                    {getInitials(userData.firstName, userData.lastName)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NavLink to="/login">Login/Register</NavLink>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This empty Toolbar acts as a spacer */}
      <Container sx={{ mt: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the Dashboard
          </Typography>
          {isLoggedIn ? (
            <Typography variant="body1">You are logged in. Welcome back!</Typography>
          ) : (
            <Typography variant="body1">Please log in to access more features.</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default DashboardPage;