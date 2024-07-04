// This directive indicates that this file is a client-side rendered component.
"use client";

// Importing necessary hooks and components from React and NextUI.
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

// Defining an array of business categories with keys and labels.
const businessCategories = [
  { key: "catering", label: "Catering" },
  { key: "commercial", label: "Commercial" },
  { key: "production", label: "Production" },
  { key: "service", label: "Service" },
  { key: "office", label: "Office" },
];

// Defining the interface for the props expected by the BusinessCategoryFilter component.
interface BusinessCategoryFilterProps {
  selectedCategories: { [key: string]: number };
  setSelectedCategories: (categories: { [key: string]: number }) => void;
}

// Defining the BusinessCategoryFilter functional component.
export const BusinessCategoryFilter: React.FC<BusinessCategoryFilterProps> = ({
  selectedCategories = {},
  setSelectedCategories,
}) => {
  // Using useState to manage the set of selected keys.
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(Object.keys(selectedCategories).filter((key) => selectedCategories[key] === 1))
  );

  // Using useEffect to update the selected categories when selectedKeys changes.
  useEffect(() => {
    const updatedCategories: { [key: string]: number } = {};
    selectedKeys.forEach((key) => {
      updatedCategories[key] = 1;
    });
    setSelectedCategories(updatedCategories);
  }, [selectedKeys, setSelectedCategories]);

  // Handling the selection change event from the dropdown menu.
  const handleSelectionChange = (keys: any) => {
    setSelectedKeys(new Set(keys as Set<string>));
  };

  // Returning the JSX structure of the component.
  return (
    <div className="flex-1 min-w-[250px]">
      {/* Label for the dropdown menu */}
      <label
        htmlFor="business-category"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Business Category
      </label>
      {/* Dropdown component from NextUI */}
      <Dropdown>
        <DropdownTrigger>
          {/* Button to trigger the dropdown menu */}
          <Button
            className="capitalize w-full"
            variant="bordered"
            id="business-category"
          >
            {"Select Business Categories"}
          </Button>
        </DropdownTrigger>
        {/* Dropdown menu with multiple selection mode */}
        <DropdownMenu
          aria-label="Business Category Selection"
          closeOnSelect={false}
          selectedKeys={Array.from(selectedKeys)}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={(keys) => handleSelectionChange(keys)}
        >
          {/* Mapping over business categories to create dropdown items */}
          {businessCategories.map((category) => (
            <DropdownItem key={category.key}>{category.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
