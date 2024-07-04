// This file defines the Providers component, which sets up the context providers for NextUI and theme management using NextThemes.

"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/system"; // NextUIProvider to provide the NextUI context.
import { ThemeProvider as NextThemesProvider } from "next-themes"; // NextThemesProvider to handle theme switching.
import { ThemeProviderProps } from "next-themes/dist/types"; // Type definitions for ThemeProvider props.

// Interface for the Providers component's props.
export interface ProvidersProps {
  children: React.ReactNode; // The child components to be wrapped by the providers.
  themeProps?: ThemeProviderProps; // Optional theme properties for customizing the theme provider.
}
// The Providers component definition.
export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    // Wrap the children with NextUIProvider to provide NextUI context.
    <NextUIProvider>
            {/* Wrap the children with NextThemesProvider to enable theme switching. */}
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        {...themeProps}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
