// sidebar.tsx
"use client";
import React from "react";
import { usePathname } from "next/navigation";

import { HomeIcon } from "../icons/sidebar/home-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { useSidebarContext } from "../layout/layout-context";

import { Sidebar } from "./sidebar.styles";
import { CitiesDropdown } from "./cities-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarUserDropdown } from "./sidebar-user-dropdown"; // Make sure the path is correct

// SidebarWrapper component definition
export const SidebarWrapper = () => {
  const pathname = usePathname(); // Get the current pathname using the Next.js usePathname hook
  const { collapsed, setCollapsed } = useSidebarContext(); // Get the collapsed state and the function to toggle it from the sidebar context

  // Function to handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      setCollapsed(); // Toggle the collapsed state when Enter or Space is pressed
    }
  };

  return (
    <aside className="h-screen z-[20] sticky top-0 flex flex-col justify-between">
      {/* Conditional rendering of the overlay when the sidebar is collapsed */}
      {collapsed ? (
        <div
          className={Sidebar.Overlay()} // Apply the overlay styles
          onClick={setCollapsed} // Toggle the collapsed state when the overlay is clicked
          role="button" // Set the role to button for accessibility
          tabIndex={0} // Set the tab index to 0 for accessibility
          onKeyDown={handleKeyDown} // Handle keyboard events for accessibility
          aria-label="Collapse sidebar" // Set the aria-label for accessibility
        />
      ) : null}
      {/* Sidebar container with dynamic styles based on collapsed state */}
      <div
        className={Sidebar({
          collapsed: collapsed, // Apply the collapsed styles when the sidebar is collapsed
        })}
        style={{ display: "flex", flexDirection: "column", height: "100%" }} // Set the sidebar container styles
      >
        {/* Sidebar header section */}
        <div className={Sidebar.Header()}>
          <CitiesDropdown /> {/* Dropdown component for selecting cities */}
        </div>
        <div className="flex-grow">
            {/* This div will take up the remaining space in the flex container due to 'flex-grow' */}
          <div className={Sidebar.Body()}>
            {/* Renders the body of the sidebar, with classes applied from Sidebar.Body() */}
            <SidebarItem
              href="/"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              title="Home"
            />
            {/* SidebarItem component represents an individual item in the sidebar.
         - href: The URL this item links to.
         - icon: The icon to be displayed, in this case, a HomeIcon component.
         - isActive: Boolean to indicate if this item is the active one based on the current pathname.
         - title: The text label for this item. */}
          </div>
        </div>
        <div className="p-4 flex justify-around items-center">
          {/* A div with padding of 4 units, uses flexbox to distribute items evenly with 'justify-around'
       and aligns items to the center along the cross axis */}
          <a
            className="flex items-center" // Apply flexbox styles to the anchor element
            href="https://github.com/Amalaga19/Barter-Project" // Link to the GitHub repository
            target="_blank" // Open the link in a new tab
          >
            <GithubIcon /> {/* Render the GitHub icon */}
          </a>
          <SidebarUserDropdown /> {/* Render the user dropdown component */}
        </div>
      </div>
    </aside>
  );
};