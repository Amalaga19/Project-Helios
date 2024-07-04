// Importing the React library to use React components and ReactNode type.
import React from "react";
// Importing clsx library for conditionally combining class names.
import clsx from "clsx";
// Importing custom font configuration.
import { fontSans } from "@/config/fonts";

// Defining the DashboardLayout component which takes children as props.
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Returning the JSX structure of the component.
  return (
     // div element with conditional classes for layout styling.
    <div
      className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.className,
      )}
    >
      {/* Rendering the children elements inside this layout component. */}
      {children}
    </div>
  );
};

// Exporting the DashboardLayout component as the default export.
export default DashboardLayout;
