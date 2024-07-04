// Importing the React library to use React components and ReactNode type.
import React from "react";

// Importing clsx library for conditionally combining class names.
import clsx from "clsx";

// Importing custom font configuration.
import { fontSans } from "@/config/fonts";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Returning the JSX structure of the component.
  return (
    // div element with conditional classes for layout styling.
    <div className={clsx("relative flex flex-col h-screen", fontSans.variable)}>
      {/* Rendering the children elements inside this layout component. */}
      {children}
    </div>
  );
}
