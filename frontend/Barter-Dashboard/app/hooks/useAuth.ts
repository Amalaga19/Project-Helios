import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { checkAuth, loginUser, logoutUser } from '@/utils/api';

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
    isAuthenticated: false,
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const data = await checkAuth();
        if (data.userId) {
          setAuthState({
            userId: data.userId,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            userId: undefined,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        setAuthState({
          userId: undefined,
          isAuthenticated: false,
        });
      }
    };

    checkAuthentication();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await loginUser(username, password);
      Cookies.set('userId', response.userId);
      setAuthState({
        userId: response.userId,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      Cookies.remove('userId');
      setAuthState({
        userId: undefined,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
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
    authenticatedAxiosPost,
    authenticatedAxiosGet,
  };
};
