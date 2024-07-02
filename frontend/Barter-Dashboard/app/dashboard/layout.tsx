import React from 'react';
import { fontSans } from '@/config/fonts';
import clsx from 'clsx';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.className)}>
      {children}
    </div>
  );
};

export default DashboardLayout;
