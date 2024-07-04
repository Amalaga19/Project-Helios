// Importing the React library to use React components and ReactNode type.
import React from "react";
// Importing clsx library for conditionally combining class names.
import clsx from "clsx";

// Importing custom font configuration.
import { fontSans } from "@/config/fonts";

// Defining the SimpleLayout component which takes children as props.
export default function SimpleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Returning the JSX structure of the component.
  return (
    // div element with conditional classes for layout styling.
    <div
      className={clsx(
        "container mx-auto max-w-7xl pt-16 px-8 md:px-12 flex-grow",
        fontSans.variable,
      )}
    >
      {/* Rendering the children elements inside this layout component. */}
      {children}
    </div>
  );
}
