// app/dashboard/components/layout/layout-context.ts
"use client";

import { createContext, useContext } from 'react';

interface SidebarContextProps {
  collapsed: boolean;
  setCollapsed: () => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebarContext = () => useContext(SidebarContext);
