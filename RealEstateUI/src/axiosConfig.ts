import axios from 'axios';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Set your backend API base URL
  withCredentials: true, // Include cookies in all requests
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

export default axiosInstance;