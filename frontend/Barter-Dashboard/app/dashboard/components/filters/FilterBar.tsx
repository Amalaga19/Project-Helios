// This directive indicates that this file is a client-side rendered component.
"use client";

// Importing React to use React components and types.
import React from "react";
// Importing the BusinessCategoryFilter component.
import { BusinessCategoryFilter } from "./BusinessCategoryFilter";

// Defining the interface for the props expected by the FilterBar component.
interface FilterBarProps {
  selectedCategories: { [key: string]: number };
  setSelectedCategories: (categories: { [key: string]: number }) => void;
}

// Defining the FilterBar functional component.
export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  // Returning the JSX structure of the component.
  return (
    // Main container div with utility classes for styling.
    <div className="flex flex-col gap-4 p-4 border-b border-default-300">
      {/* Heading for the filter options */}
      <h2 className="text-xl font-bold mb-4">Filter Options</h2>
      {/* Container for the filter components */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          {/* BusinessCategoryFilter component with selectedCategories and setSelectedCategories props */}
          <BusinessCategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>
    </div>
  );
};
