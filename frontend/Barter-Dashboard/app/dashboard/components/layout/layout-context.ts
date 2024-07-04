// This directive indicates that this file is a client-side rendered component.
"use client";

// Importing createContext and useContext hooks from React.
import { createContext, useContext } from "react";

// Defining the SidebarContext interface to type the context value.
interface SidebarContext {
  collapsed: boolean; // A boolean to track whether the sidebar is collapsed.
  setCollapsed: () => void; // A function to toggle the collapsed state.
}

// Creating the SidebarContext with a default value.
export const SidebarContext = createContext<SidebarContext>({
  collapsed: false, // Default value for the collapsed state.
  setCollapsed: () => {}, // Default no-op function for setCollapsed.
});

// Creating a custom hook to use the SidebarContext.
export const useSidebarContext = () => {
  // Returning the context value from useContext hook.
  return useContext(SidebarContext);
};
