// This directive indicates that this file is a client-side rendered component.
"use client";

// Importing React to use React components and hooks.
import React from "react";

// Importing the SidebarWrapper component.
import { SidebarWrapper } from "../sidebar/sidebar";

// Importing the SidebarContext from layout-context.
import { SidebarContext } from "./layout-context";

// Defining the Props interface for the Layout component.
interface Props {
  children: React.ReactNode; // The children prop represents the nested components or elements inside this layout.
}

// Defining the Layout functional component.
export const Layout = ({ children }: Props) => {
  // Using useState to manage the sidebarOpen state.
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Function to toggle the sidebar open state.
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Returning the JSX structure of the component.
  return (
    // Providing the SidebarContext value to its children.
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        {/* SidebarWrapper component to render the sidebar. */}
        <SidebarWrapper /> {/* Ensure this is rendered only once */}
        {/* Main content area that will grow to fill available space. */}
        <div className="content flex-grow">{children}</div>
      </section>
    </SidebarContext.Provider>
  );
};
