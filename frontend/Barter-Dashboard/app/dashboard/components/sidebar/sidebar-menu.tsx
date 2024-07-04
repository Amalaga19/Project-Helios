// Importing React to use JSX and component functionalities.
import React from "react";

// Defining the Props interface for the SidebarMenu component.
// This interface specifies the types of the props that the component accepts.
interface Props {
  title: string; // The title of the sidebar menu section
  children?: React.ReactNode; // Optional prop for any child components or elements
}

// SidebarMenu functional component definition.
// This component represents a menu section in the sidebar, which includes a title and optionally child elements.
export const SidebarMenu = ({ title, children }: Props) => {
  // Returning the JSX structure for the sidebar menu section.
  return (
    <div className="flex gap-2 flex-col">
      {/* Rendering the title of the menu section */}
      <span className="text-xs font-normal ">{title}</span>
      {/* Rendering any children passed to the SidebarMenu component */}
      {children}
    </div>
  );
};
