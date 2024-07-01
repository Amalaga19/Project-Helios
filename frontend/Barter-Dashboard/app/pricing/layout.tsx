import React from "react";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx("relative flex flex-col h-screen", fontSans.variable)}>
      <main className="container mx-auto max-w-7xl pt-16 px-8 md:px-12 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
}
