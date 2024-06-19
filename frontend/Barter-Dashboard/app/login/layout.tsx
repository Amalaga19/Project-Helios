"use client";
import { ReactNode } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex flex-col justify-between bg-purple-900 text-white p-8 lg:w-8/12">
        <nav className="flex items-center space-x-4 mb-8">
          <h1 className="text-2xl font-bold">
            ChatGPT<span className="text-purple-500">●</span>
          </h1>
        </nav>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-3xl lg:text-5xl font-bold mb-8">
            <p>Draft an email</p>
            <p>requesting a deadline extension for my project</p>
          </div>
        </div>
        <div className="hidden lg:block"></div>
      </div>
      <div className="flex flex-col items-center justify-between bg-black text-white p-8 lg:w-4/12">
        <div className="w-full max-w-md text-center flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold mb-8">Get started</h2>
          <div className="flex justify-center space-x-4 mb-12">
            <Button className="w-1/2" color="primary" radius="full">
              Log in
            </Button>
            <Button className="w-1/2" color="primary" radius="full">
              Sign up
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-400 mb-8">
          <Link href="https://openai.com/policies/terms-of-use" target="_blank" rel="noreferrer">
            Terms of use
          </Link>
          {' | '}
          <Link href="https://openai.com/policies/privacy-policy" target="_blank" rel="noreferrer">
            Privacy policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
