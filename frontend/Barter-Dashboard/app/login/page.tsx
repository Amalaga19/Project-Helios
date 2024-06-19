"use client";
import { ReactNode } from "react";
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Link } from '@nextui-org/link';

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="flex min-h-full w-screen flex-col sm:supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
      <div className="relative hidden flex-1 flex-col justify-center px-5 pt-8 text-[#FE7600] dark:text-[#D292FF] md:flex md:px-6 md:py-[22px] lg:px-8 bg-purple-600">
        <nav className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
          <h1 aria-label="ChatGPT by OpenAI">
            <div className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px]">
              <div>ChatGPT<span className="font-circle">●</span></div>
            </div>
          </h1>
        </nav>
        <div className="flex flex-col text-[32px] leading-[1.2] md:text-[40px]" aria-hidden="true">
          <div className="-mt-4 flex w-full flex-col pr-5 md:pr-8 lg:pr-10">
            <p className="font-bold">Recommend a dish</p>
            <p className="font-normal">to i<span className="font-circle">●</span></p>
          </div>
        </div>
      </div>
      <div className="relative flex grow flex-col items-center justify-between bg-black px-5 py-8 text-white sm:rounded-t-[30px] md:rounded-none md:px-6">
        {children}
      </div>
    </div>
  );
};

const LoginPage = () => {
  const { setAuthToken, setUser } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Replace with your login logic
      const token = 'mockToken'; // Replace with the actual token
      const userId = 'mockUserId'; // Replace with the actual user ID
      setAuthToken(token);
      setUser(userId);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white p-8 rounded-2xl">
      <h2 className="text-center text-2xl font-bold">Get started</h2>
      <div className="mt-5 w-full max-w-md">
        <Button 
          className="mb-4 w-full" 
          onClick={handleLogin}
        >
          Log in
        </Button>
        <Button 
          className="w-full" 
          onClick={handleSignUp}
        >
          Sign up
        </Button>
      </div>
      <div className="mt-10 text-center text-gray-400 text-sm">
        <Link href="https://openai.com/policies/terms-of-use" target="_blank" rel="noreferrer">
          Terms of use
        </Link>
        {' | '}
        <Link href="https://openai.com/policies/privacy-policy" target="_blank" rel="noreferrer">
          Privacy policy
        </Link>
      </div>
    </div>
  );
};

export default function LoginPageWithLayout() {
  return (
    <LoginLayout>
      <LoginPage />
    </LoginLayout>
  );
}
