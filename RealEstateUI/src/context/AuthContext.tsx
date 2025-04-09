import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axiosInstance from '../axiosConfig';

interface UserData {
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get('/check-auth');
      setIsLoggedIn(response.data.isLoggedIn);
      if (response.data.isLoggedIn && response.data.user) {
        setUserData(response.data.user);
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/logout');
      setIsLoggedIn(false);
      setUserData(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};