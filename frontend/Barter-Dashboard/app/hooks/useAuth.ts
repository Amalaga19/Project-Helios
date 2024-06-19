import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

const apiBaseURL = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
  baseURL: apiBaseURL,
});

interface AuthState {
  userId: string | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    userId: Cookies.get('userId'),
    token: Cookies.get('authToken'),
    isAuthenticated: false,
  });

  useEffect(() => {
    const updateAuthState = (token: string | undefined) => {
      const updatedIsAuthenticated = !!token && !isTokenExpired(token);
      setAuthState(currentAuthState => ({
        ...currentAuthState,
        isAuthenticated: updatedIsAuthenticated,
      }));

      axiosInstance.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    };

    updateAuthState(authState.token);
  }, [authState.token]);

  const isTokenExpired = (token: string) => {
    if (!token) return true;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (e) {
      console.error("Error decoding token:", e);
      return true;
    }
  };

  const setAuthToken = (token: string) => {
    Cookies.set('authToken', token);
    setAuthState(currentAuthState => ({
      ...currentAuthState,
      token: token,
      isAuthenticated: !!token && !isTokenExpired(token),
    }));
  };

  const setUser = (userId: string) => {
    Cookies.set('userId', userId);
    setAuthState(currentAuthState => ({
      ...currentAuthState,
      userId: userId,
    }));
  };

  const clearAuth = () => {
    Cookies.remove('authToken');
    Cookies.remove('userId');
    setAuthState({
      userId: undefined,
      token: undefined,
      isAuthenticated: false,
    });
  };

  const checkIsAuthenticated = () => {
    const token = authState.token;
    return !!token && !isTokenExpired(token);
  };

  const handleAxiosError = (error: any) => {
    console.error("Error in authenticated request:", error);
    if (error.response) {
      return { error: error.response.data, status: error.response.status };
    } else if (error.request) {
      return { error: "No response from the server", status: null };
    } else {
      return { error: error.message, status: null };
    }
  };

  const authenticatedAxiosPost = async (url: string, data: any) => {
    if (!checkIsAuthenticated()) {
      console.error("User is not authenticated");
      return { error: "User is not authenticated", status: 401 };
    }
    try {
      const response = await axiosInstance.post(url, data);
      return response;
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  const authenticatedAxiosGet = async (url: string) => {
    if (!checkIsAuthenticated()) {
      console.error("User is not authenticated");
      return { error: "User is not authenticated", status: 401 };
    }
    try {
      const response = await axiosInstance.get(url);
      return response;
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  return {
    auth: authState,
    setAuthToken,
    setUser,
    clearAuth,
    isAuthenticated: checkIsAuthenticated,
    authenticatedAxiosPost,
    authenticatedAxiosGet,
  };
};
