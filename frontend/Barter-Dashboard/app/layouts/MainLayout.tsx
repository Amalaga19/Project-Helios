// Importing the React library to use React components and ReactNode type.
import React from "react";
// Importing clsx library for conditionally combining class names.
import clsx from "clsx";

// Importing the Navbar component.
import { Navbar } from "@/components/navbar";
// Importing custom font configuration.
import { fontSans } from "@/config/fonts";

// Defining the MainLayout component which takes children as props.
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Returning the JSX structure of the component.
  return (
    // div element with conditional classes for layout styling.
    <div className={clsx("relative flex flex-col h-screen", fontSans.variable)}>
      {/* Rendering the Navbar component at the top of the layout. */}
      <Navbar />
      {/* Main content area with responsive padding and flex-grow for filling available space. */}
      <main className="container mx-auto max-w-7xl flex-grow">
        {/* Rendering the children elements inside this main content area. */}
        {children}
      </main>
    </div>
  );
}
