"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from "../hooks/useAuth";

const UserLogin = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    form: "",
  });

  const validateUsername = (username: string) => {
    return username.trim() !== "";
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return passwordRegex.test(password);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let usernameError = "";
    let passwordError = "";

    if (!validateUsername(username)) {
      usernameError = "Please enter a valid username.";
    }

    if (!validatePassword(password)) {
      passwordError =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError, form: "" });

      return;
    }

    try {
      await login(username, password);
      localStorage.setItem("loggedInUser", username);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        username: "",
        password: "",
        form: "Login failed. Please check your credentials and try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Log in to your account</h1>
      <input
        className="w-full max-w-md px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        placeholder="Username*"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errors.username && (
        <p className="text-red-500 text-sm mb-4">{errors.username}</p>
      )}
      <div className="relative w-full max-w-md">
        <input
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mb-4">{errors.password}</p>
      )}
      {errors.form && (
        <p className="text-red-500 text-sm mb-4">{errors.form}</p>
      )}
      <button
        className="w-full max-w-md px-4 py-2 mb-4 text-white bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        onClick={handleLogin}
      >
        Log in
      </button>
      <p className="mb-4">
        Don&apos;t have an account?{" "}
        <a className="text-secondary" href="/signup">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default UserLogin;
