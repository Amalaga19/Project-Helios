// dashboard/layout.tsx
import React from 'react';
import { Providers } from '../providers';
import { fontSans } from '@/config/fonts';
import clsx from 'clsx';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.className)}>
      <Providers>
        <header>
          {/* Dashboard header */}
        </header>
        <main>{children}</main>
        <footer>
          {/* Dashboard footer */}
        </footer>
      </Providers>
    </div>
  );
};

export default DashboardLayout;
