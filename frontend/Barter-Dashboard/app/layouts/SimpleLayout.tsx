import React from "react";
import clsx from "clsx";
import { Providers } from "../providers";
import { fontSans } from "@/config/fonts";

export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx("container mx-auto max-w-7xl pt-16 px-8 md:px-12 flex-grow", fontSans.variable)}>
      {children}
    </div>
  );
}
