"use client"; // This directive indicates that this file is a client-side rendered component.

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from "../hooks/useAuth";

const UserLogin = () => {
  const { login } = useAuth(); // Importing the login function from the useAuth hook.
  const router = useRouter(); // Importing the useRouter hook from Next.js.
  const [username, setUsername] = useState(""); // Using the useState hook to manage the username state.
  const [password, setPassword] = useState(""); // Using the useState hook to manage the password state.
  const [showPassword, setShowPassword] = useState(false); // Using the useState hook to manage the showPassword state.
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    form: "",
  }); // Using the useState hook to manage the errors state.

  // Function to validate the username input.
  const validateUsername = (username: string) => {
    return username.trim() !== ""; // Return true if the username is not empty.
  };

  // Function to validate the password input.
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // Regular expression for password validation.

    return passwordRegex.test(password);
  };

  // Function to handle the login form submission.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    let usernameError = "";
    let passwordError = "";

    if (!validateUsername(username)) {
      usernameError = "Please enter a valid username."; // Set the username error message.
    }

    if (!validatePassword(password)) {
      passwordError =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError, form: "" }); // Set the errors state.

      return;
    }

    try {
      await login(username, password);
      localStorage.setItem("loggedInUser", username); // Store the username in local storage.
      router.push("/dashboard"); // Redirect to the dashboard page after successful login.
    } catch (error) {
      console.error("Login failed:", error); // Log the error to the console.
      setErrors({
        username: "",
        password: "",
        form: "Login failed. Please check your credentials and try again.", // Set the form error message.
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Log in to your account</h1> {/* Page title */}
      <input
        className="w-full max-w-md px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update the username state on change.
      />
      {errors.username && (
        <p className="text-red-500 text-sm mb-4">{errors.username}</p> // Display the username error message.
      )}
      <div className="relative w-full max-w-md">
        <input
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update the password state on change.
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          type="button"
          onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state on click.
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/hide password icon */}
        </button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mb-4">{errors.password}</p> // Display the password error message.
      )}
      {errors.form && (
        <p className="text-red-500 text-sm mb-4">{errors.form}</p> // Display the form error message.
      )}
      <button
        className="w-full max-w-md px-4 py-2 mb-4 text-white bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        onClick={handleLogin} // Call the handleLogin function on click.
      >
        Log in
      </button>
      <p className="mb-4">
        Don&apos;t have an account?{" "}
        <a className="text-secondary" href="/signup">
          Sign up
        </a> {/* Link to signup page */}
      </p>
    </div>
  );
};

export default UserLogin;
