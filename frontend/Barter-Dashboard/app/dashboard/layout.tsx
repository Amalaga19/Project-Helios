// dashboard/layout.tsx
import React from 'react';
import { Providers } from '../providers';
import { fontSans } from '@/config/fonts';
import clsx from 'clsx';
import { Layout } from './components/layout/layout'; // Adjust the import path as necessary

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.className)}>
      <Providers>
        <Layout>
          {children}
        </Layout>
      </Providers>
    </div>
  );
};

export default DashboardLayout;