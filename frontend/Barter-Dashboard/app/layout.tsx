"use client";

import "@/styles/globals.css";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import MainLayout from "./layouts/MainLayout";
import SimpleLayout from "./layouts/SimpleLayout";
import LoginLayout from "./login/layout";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  let LayoutComponent;
  if (pathname.startsWith("/login")) {
    LayoutComponent = LoginLayout;
  } else if (pathname.startsWith("/signup")) {
    LayoutComponent = SimpleLayout;
  } else if (pathname.startsWith("/userlogin")) {
    LayoutComponent = SimpleLayout;
  }else {
    LayoutComponent = MainLayout;
  }

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <LayoutComponent>{children}</LayoutComponent>
        </Providers>
      </body>
    </html>
  );
}
