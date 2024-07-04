import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const apiBaseURL = "http://localhost:5000"; // Ensure this matches your backend URL
// Create an instance of axios with the base URL and credentials set to true
const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

// Define the AuthState interface to represent the authentication state
interface AuthState {
  userId: string | undefined;
  isAuthenticated: boolean;
}
// Define the useAuth hook to manage authentication state and provide authentication methods
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    userId: Cookies.get("userId"),
    isAuthenticated: !!Cookies.get("userId"),
  });

  const router = useRouter(); // Use the useRouter hook for navigation

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post("/login", {
        username,
        password,
      }); // Make a POST request to the login endpoint
      const userId = response.data.username; // Assuming the response contains the user ID

      Cookies.set("userId", userId); // Set the user ID in cookies
      setAuthState({
        userId,
        isAuthenticated: true,
      }); // Update the auth state

      return response.data; // Return the response data
    } catch (error) {
      console.error("Login failed:", error);
      throw error;// Throw an error for the calling function to handle
    }
  }; // Define a function to log out the user

  const logout = async () => {
    try {
      const response = await axiosInstance.get("/logout"); // Ensure you have a logout endpoint

      console.log("Logout response:", response); // Log the response for debugging
      Cookies.remove("userId"); // Remove the user ID from cookies
      setAuthState({
        userId: undefined,
        isAuthenticated: false,
      }); // Update the auth state
      router.push("/"); // Redirect to the home page after logout
    } catch (error) {
      console.error("Logout failed:", error); // Log the error for debugging
    }
  }; // Define a function to register a new user

  // Define a function to register a new user
  const register = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post("/register", {
        username,
        password,
      }); // Make a POST request to the register endpoint
      const userId = response.data.username; // Assuming the response contains the user ID

      Cookies.set("userId", userId); // Set the user ID in cookies
      setAuthState({
        userId,
        isAuthenticated: true,
      }); // Update the auth state

      return response.data; // Return the response data
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Throw an error for the calling function to handle
    }
  };

  // Define a function to make authenticated POST requests
  const authenticatedAxiosPost = async (url: string, data: any) => {
    try {
      const response = await axiosInstance.post(url, data); // Make a POST request using the axios instance

      return response; // Return the response data
    } catch (error: any) {
      console.error("Error in authenticated request:", error); // Log the error for debugging
      if (error.response) {
        return { error: error.response.data, status: error.response.status }; // Catch response errors
      } else if (error.request) {
        return { error: "No response from the server", status: null }; // Catch request errors
      } else {
        return { error: error.message, status: null }; // Catch any other errors
      }
    }
  };

  // Define a function to make authenticated GET requests
  const authenticatedAxiosGet = async (url: string) => {
    try {
      const response = await axiosInstance.get(url); // Make a GET request using the axios instance

      return response; // Return the response data
    } catch (error: any) {
      console.error("Error in authenticated request:", error); // Log the error for debugging
      if (error.response) {
        return { error: error.response.data, status: error.response.status }; // Catch response errors
      } else if (error.request) {
        return { error: "No response from the server", status: null }; // Catch request errors
      } else {
        return { error: error.message, status: null }; // Catch any other errors
      }
    }
  };

  return {
    auth: authState, // Return the auth state
    login, // Include the login method
    logout, // Include the logout method
    register, // Include the register method
    authenticatedAxiosPost, // Include the authenticatedAxiosPost method
    authenticatedAxiosGet, // Include the authenticatedAxiosGet method
  };
};
