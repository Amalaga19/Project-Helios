// This directive indicates that this file is a client-side rendered component.
"use client";
// Importing global CSS styles.
import "@/styles/globals.css";
// Importing clsx library for conditionally combining class names.
import clsx from "clsx";
// Importing usePathname hook from Next.js for getting the current pathname.
import { usePathname } from "next/navigation";

// Importing custom font configuration.
import { fontSans } from "@/config/fonts";

// Importing the Providers component which wraps around the app, possibly for context providers.
import { Providers } from "./providers";

// Importing different layout components for various routes.
import MainLayout from "./layouts/MainLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import LoginLayout from "./login/layout";
import DashboardLayout from "./dashboard/layout"; // Ensure this import path is correct

// Defining the RootLayout component which takes children as props. 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Using usePathname hook to get the current pathname.
  const pathname = usePathname();

  // Variable to hold the selected layout component based on the current pathname.
  let LayoutComponent;

  // Determining the layout component to use based on the pathname.
  if (pathname.startsWith("/login")) {
    LayoutComponent = LoginLayout; // Use LoginLayout for paths starting with /login
  } else if (pathname.startsWith("/signup")) {
    LayoutComponent = SimpleLayout; // Use SimpleLayout for paths starting with /signup
  } else if (pathname.startsWith("/userlogin")) {
    LayoutComponent = SimpleLayout; // Use SimpleLayout for paths starting with /userlogin
  } else if (pathname.startsWith("/dashboard")) {
    LayoutComponent = DashboardLayout; // Use DashboardLayout for paths starting with /dashboard
  } else {
    LayoutComponent = MainLayout; // Use MainLayout for all other paths
  }

  // Returning the JSX structure of the component.
  return (
    // HTML element with suppression of hydration warning and language set to English.
    <html suppressHydrationWarning lang="en">
      {/* Head element, typically used for metadata */}
      <head />
      {/* Body element with classes for minimum height, background, font, and antialiasing */}
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* Providers component wrapping the layout component and children */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <LayoutComponent>{children}</LayoutComponent>
        </Providers>
      </body>
    </html>
  );
}
