"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import useAuth from "../hooks/useAuth";

const LoginComponent: React.FC = () => {
  const { login, signup } = useAuth();

  const handleLogin = () => {
    login("user@example.com", "password123");
  };

  const handleSignup = () => {
    signup("user@example.com", "password123");
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col items-center justify-center bg-dark text-white">
        <h1 className="text-4xl">Improve my post for hiring a store assistant</h1>
      </div>
      <div className="flex flex-1 items-center justify-center bg-black">
        <div>
          <Button onClick={handleLogin}>Log in</Button>
          <Button onClick={handleSignup} className="ml-4">Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
