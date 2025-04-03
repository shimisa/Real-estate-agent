import axios from 'axios';
import qs from 'qs';
import axiosInstance from '../axiosConfig'; // Import the configured Axios instance

const API_URL = 'http://localhost:8080/api';

export interface LoginUserParams {
  username: string;
  password: string;
}

export interface RegisterUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const loginUser = async (params: LoginUserParams): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      '/login',
      qs.stringify(params),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

export const registerUser = async (params: RegisterUserParams): Promise<any> => {
  try {
    const response = await axiosInstance.post('/register', params);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;
  }
};

// Add more API functions as needed
