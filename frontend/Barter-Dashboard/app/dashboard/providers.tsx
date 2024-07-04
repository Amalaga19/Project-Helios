// providers.tsx
// This directive indicates that this file is a client-side rendered component.
"use client";
// Importing React to use React components and types.
import * as React from "react";
// Importing NextUIProvider from the NextUI library to provide UI components with styling.
import { NextUIProvider } from "@nextui-org/system";
// Importing ThemeProvider from the next-themes library to handle theme switching.
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Importing the ThemeProviderProps type from next-themes to type the themeProps prop.
import { ThemeProviderProps } from "next-themes/dist/types";

// Defining an interface for the props expected by the Providers component.
export interface ProvidersProps {
  children: React.ReactNode; // The children prop represents the nested components or elements inside this provider.
  themeProps?: ThemeProviderProps; // Optional themeProps prop to customize the theme provider settings.
}

// Defining the Providers component which wraps its children with theme and UI providers.
export function Providers({ children, themeProps }: ProvidersProps) {
  // Returning the JSX structure of the component.
  return (
    // Wrapping the children with the NextUIProvider to provide UI component styles.
    <NextUIProvider>
      {/* Wrapping the children with the NextThemesProvider to enable theme switching. */}
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        {...themeProps}
      >
        {children} {/* Rendering the children elements inside these providers. */}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
