"use client";

import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const businessCategories = [
  { key: "catering", label: "Catering" },
  { key: "commercial", label: "Commercial" },
  { key: "production", label: "Production" },
  { key: "service", label: "Service" },
  { key: "office", label: "Office" },
];

interface BusinessCategoryFilterProps {
  selectedCategories: { [key: string]: number };
  setSelectedCategories: (categories: { [key: string]: number }) => void;
}

export const BusinessCategoryFilter: React.FC<BusinessCategoryFilterProps> = ({
  selectedCategories = {},
  setSelectedCategories,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(Object.keys(selectedCategories).filter((key) => selectedCategories[key] === 1))
  );

  useEffect(() => {
    const updatedCategories: { [key: string]: number } = {};
    selectedKeys.forEach((key) => {
      updatedCategories[key] = 1;
    });
    setSelectedCategories(updatedCategories);
  }, [selectedKeys, setSelectedCategories]);

  const handleSelectionChange = (keys: any) => {
    setSelectedKeys(new Set(keys as Set<string>));
  };

  return (
    <div className="flex-1 min-w-[250px]">
      <label
        htmlFor="business-category"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Business Category
      </label>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="capitalize w-full"
            variant="bordered"
            id="business-category"
          >
            {"Select Business Categories"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Business Category Selection"
          closeOnSelect={false}
          selectedKeys={Array.from(selectedKeys)}
          selectionMode="multiple"
          variant="flat"
          onSelectionChange={(keys) => handleSelectionChange(keys)}
        >
          {businessCategories.map((category) => (
            <DropdownItem key={category.key}>{category.label}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
