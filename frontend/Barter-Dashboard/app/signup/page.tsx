"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from "../hooks/useAuth";

const SignUpPage = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return passwordRegex.test(password);
  };

  const handleContinue = async () => {
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!validatePassword(password)) {
      passwordError =
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError, form: "" });

      return;
    }

    try {
      await register(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({
        email: "",
        password: "",
        form: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Create your account</h1>
      <input
        className="w-full max-w-md px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
        placeholder="Email address*"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-4">{errors.email}</p>
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
        onClick={handleContinue}
      >
        Continue
      </button>
      <p className="mb-4">
        Already have an account?{" "}
        <a className="text-secondary" href="/userlogin">
          Log in
        </a>
      </p>
    </div>
  );
};

export default SignUpPage;
