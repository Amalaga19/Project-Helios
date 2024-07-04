// This directive indicates that this file is a client-side rendered component.
"use client";

// Importing ReactNode type from React to specify the type for children prop.
import { ReactNode } from "react";

// Defining an interface for the props expected by the LoginLayout component.
interface LoginLayoutProps {
  children: ReactNode; // The children prop represents the nested components or elements inside this layout.
}

// Defining the LoginLayout component which takes children as props.
const LoginLayout = ({ children }: LoginLayoutProps) => {
  // Returning the JSX structure of the component.
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">{children}</div>
  );
};

// Exporting the LoginLayout component as the default export.
export default LoginLayout;
