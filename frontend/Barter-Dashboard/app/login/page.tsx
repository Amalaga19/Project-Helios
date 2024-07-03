"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import LoginLayout from "./layout";

const LoginPage = () => {
  const router = useRouter();

  const handleLogInClick = () => {
    router.push("/userlogin");
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };

  return (
    <LoginLayout>
      <div className="flex flex-col justify-between bg-white text-purple-900 p-8 lg:w-8/12">
        <nav className="flex items-center space-x-4 mb-8">
          <Link href="/" legacyBehavior passHref>
            <a href="/">
              <Image
                alt="Project Helios Logo"
                height={36}
                src="/logos/Icon_logo.png"
                width={36}
              />
            </a>
          </Link>
          <Link href="/" legacyBehavior passHref>
            <a href="/" className="text-2xl font-bold">
              Project Helios
              <span className="text-purple-500" />
            </a>
          </Link>
        </nav>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-3xl lg:text-5xl font-bold mb-8">
            <p>Welcome back to Project Helios</p>
            <p>Empowering Madrid with Solar Energy</p>
            <p className="text-xl lg:text-2xl mt-4">
              Log in to access our advanced tools and insights, helping you
              pinpoint the best locations for solar-powered generators
            </p>
          </div>
        </div>
        <div className="hidden lg:block" />
      </div>
      <div className="flex flex-col items-center justify-between bg-black text-white p-8 lg:w-4/12">
        <div className="w-full max-w-md text-center flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold mb-8">Get started</h2>
          <div className="flex justify-center space-x-4 mb-12">
            <Button
              color="primary"
              radius="full"
              className="w-1/2"
              onClick={handleLogInClick}
            >
              Log in
            </Button>
            <Button
              color="primary"
              radius="full"
              className="w-1/2"
              onClick={handleSignUpClick}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;