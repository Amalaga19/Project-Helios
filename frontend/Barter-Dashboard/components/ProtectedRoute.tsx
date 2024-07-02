import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../app/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace('/login'); // Use replace to avoid the back button leading to a protected page
    }
  }, [auth.isAuthenticated, router]);

  if (!auth.isAuthenticated) {
    return null; // Return null if the user is not authenticated
  }

  return <>{children}</>;
};

export default ProtectedRoute;
