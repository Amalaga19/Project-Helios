// app/login/layout.tsx
'use client';

import { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {children}
    </div>
  );
};

export default LoginLayout;
