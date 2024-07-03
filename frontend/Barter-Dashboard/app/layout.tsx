"use client";

import "@/styles/globals.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { fontSans } from "@/config/fonts";

import { Providers } from "./providers";
import MainLayout from "./layouts/MainLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import LoginLayout from "./login/layout";
import DashboardLayout from "./dashboard/layout"; // Ensure this import path is correct

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let LayoutComponent;

  if (pathname.startsWith("/login")) {
    LayoutComponent = LoginLayout;
  } else if (pathname.startsWith("/signup")) {
    LayoutComponent = SimpleLayout;
  } else if (pathname.startsWith("/userlogin")) {
    LayoutComponent = SimpleLayout;
  } else if (pathname.startsWith("/dashboard")) {
    LayoutComponent = DashboardLayout; // Use DashboardLayout for dashboard paths
  } else {
    LayoutComponent = MainLayout;
  }

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <LayoutComponent>{children}</LayoutComponent>
        </Providers>
      </body>
    </html>
  );
}
