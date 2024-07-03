import React from "react";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.className,
      )}
    >
      {children}
    </div>
  );
};

export default DashboardLayout;
