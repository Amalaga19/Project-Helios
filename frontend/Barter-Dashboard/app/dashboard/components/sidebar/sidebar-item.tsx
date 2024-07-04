// Importing necessary modules and components from Next.js and React.
import NextLink from "next/link";
import React from "react";
import clsx from "clsx";

// Importing the custom hook useSidebarContext from the layout context.
// This hook provides context for sidebar state, such as whether it is collapsed.
import { useSidebarContext } from "../layout/layout-context";

// Defining the Props interface for the SidebarItem component.
// This interface specifies the types of the props that the component accepts.
interface Props {
  title: string; // The title of the sidebar item.
  icon: React.ReactNode; // The icon to display next to the title.
  isActive?: boolean; // Whether the sidebar item is currently active.
  href?: string; // The URL to navigate to when the sidebar item is clicked.
}

// SidebarItem functional component definition.
// This component represents an item in the sidebar, which includes an icon, title, and link.
export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  // Destructuring the collapsed state and setCollapsed function from the sidebar context.
  const { collapsed, setCollapsed } = useSidebarContext();

  // Event handler for click events on the sidebar item.
  // If the window width is less than 768 pixels, it triggers the setCollapsed function.
  const handleClick = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };

  // Returning the JSX structure for the sidebar item.
  // It uses NextLink for client-side navigation and clsx for conditional classNames.
  return (
    <NextLink href={href} passHref>
      <button
        // Applying conditional classNames based on the isActive prop using clsx.
        className={clsx(
          isActive
            ? "bg-primary-100 [&_svg_path]:fill-primary-500" // Active state styles
            : "hover:bg-default-100", // Hover state styles
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]", // Common styles
          "text-default-900 active:bg-none max-w-full" // Additional common styles
        )}
        onClick={handleClick} // Attaching the click event handler
        aria-label={title} // Setting the aria-label for accessibility
      >
        {icon} {/* Displaying the icon */}
        <span className="text-default-900">{title}</span> {/* Displaying the title */}
      </button>
    </NextLink>
  );
};
