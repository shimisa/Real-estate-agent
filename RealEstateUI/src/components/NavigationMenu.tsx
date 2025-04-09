import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Box, 
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

function NavigationMenu() {
  const { isLoggedIn, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
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
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          {/* Left section - Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '200px' }}>
            <Link to="/">
              <img src="/dira-logo.svg" alt="Dira Logo" style={{ height: '32px' }} />
            </Link>
          </Box>
          
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
    </>
  );
}

export default NavigationMenu;