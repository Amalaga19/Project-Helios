// This file defines a ProtectedRoute component that ensures only authenticated users can access its children components.

import React, { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../app/hooks/useAuth";

// Interface for the ProtectedRoute component's props.
interface ProtectedRouteProps {
  children: ReactNode; // The child components to be rendered if the user is authenticated.
}

// The ProtectedRoute component definition.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuth(); // Hook to get authentication state.
  const router = useRouter(); // Hook to access Next.js router.

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.replace("/login"); // Redirect to login page if the user is not authenticated.
    }
  }, [auth.isAuthenticated, router]); // Effect runs when authentication state or router changes.

  if (!auth.isAuthenticated) {
    return null; // Return null if the user is not authenticated to prevent rendering protected content.
  }

  return <>{children}</>; // Render the child components if the user is authenticated.
};

export default ProtectedRoute; // Export the ProtectedRoute component as default.
