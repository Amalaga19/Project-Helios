"use client";
import { Button } from '@nextui-org/button';
import { useAuth } from '../hooks/useAuth';
import { Link } from '@nextui-org/link';
import NextLink from "next/link";
import router from 'next/router';

const LoginPage = () => {
  const { setAuthToken, setUser } = useAuth();

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

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white p-8 rounded-2xl">
      <h2 className="text-center text-2xl font-bold">Get started</h2>
      <div className="mt-5 w-full max-w-md">
        <NextLink href="/userlogin" passHref>
          <Button as="a" className="mb-4 w-full" onClick={handleLogin}>
            Log in
          </Button>
        </NextLink>
        <NextLink href="/signup" passHref>
          <Button as="a" className="w-full">
            Sign up
          </Button>
        </NextLink>
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

export default LoginPage;
