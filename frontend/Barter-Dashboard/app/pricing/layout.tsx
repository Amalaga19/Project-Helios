import React from "react";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("relative flex flex-col h-screen", fontSans.variable)}>
      {children}
    </div>
  );
}
