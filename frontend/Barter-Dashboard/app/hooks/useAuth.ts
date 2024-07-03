import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const apiBaseURL = 'http://localhost:5000'; // Ensure this matches your backend URL
const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

interface AuthState {
  userId: string | undefined;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    userId: Cookies.get('userId'),
    isAuthenticated: !!Cookies.get('userId'),
  });

  const router = useRouter(); // Use the useRouter hook for navigation

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/login', { username, password });
      const userId = response.data.username;
      Cookies.set('userId', userId);
      setAuthState({
        userId,
        isAuthenticated: true,
      });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.get('/logout'); // Ensure you have a logout endpoint
      console.log('Logout response:', response); // Log the response for debugging
      Cookies.remove('userId');
      setAuthState({
        userId: undefined,
        isAuthenticated: false,
      });
      router.push('/'); // Redirect to the home page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/register', { email, password });
      const userId = response.data.username;
      Cookies.set('userId', userId);
      setAuthState({
        userId,
        isAuthenticated: true,
      });
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const authenticatedAxiosPost = async (url: string, data: any) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response;
    } catch (error: any) {
      console.error('Error in authenticated request:', error);
      if (error.response) {
        return { error: error.response.data, status: error.response.status };
      } else if (error.request) {
        return { error: 'No response from the server', status: null };
      } else {
        return { error: error.message, status: null };
      }
    }
  };

  const authenticatedAxiosGet = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response;
    } catch (error: any) {
      console.error('Error in authenticated request:', error);
      if (error.response) {
        return { error: error.response.data, status: error.response.status };
      } else if (error.request) {
        return { error: 'No response from the server', status: null };
      } else {
        return { error: error.message, status: null };
      }
    }
  };

  return {
    auth: authState,
    login,
    logout,
    register, // Include the register method
    authenticatedAxiosPost,
    authenticatedAxiosGet,
  };
};
