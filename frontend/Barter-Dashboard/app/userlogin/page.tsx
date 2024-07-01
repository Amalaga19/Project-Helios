"use client";

import React, { useState } from "react";
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const UserLogin = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "", form: "" });

  const validateUsername = (username) => {
    return username.trim() !== "";
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let usernameError = "";
    let passwordError = "";

    if (!validateUsername(username)) {
      usernameError = "Please enter a valid username.";
    }

    if (!validatePassword(password)) {
      passwordError = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return;
    }

    try {
      const response = await login(username, password);
      localStorage.setItem('loggedInUser', username);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ ...errors, form: 'Login failed. Please check your credentials and try again.' });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Log in to your account</h1>
      <input
        type="text"
        placeholder="Username*"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full max-w-md px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      {errors.username && <p className="text-red-500 text-sm mb-4">{errors.username}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-md px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}
      {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}
      <button
        onClick={handleLogin}
        className="w-full max-w-md px-4 py-2 mb-4 text-white bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        Log in
      </button>
      <p className="mb-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-secondary">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default UserLogin;
