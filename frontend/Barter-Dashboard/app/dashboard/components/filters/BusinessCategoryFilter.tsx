"use client";
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';

const businessCategories = [
  { key: 'catering', label: 'Catering' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'production', label: 'Production' },
  { key: 'service', label: 'Service' },
  { key: 'office', label: 'Office' },
];

export const BusinessCategoryFilter = ({ selectedCategories = {}, setSelectedCategories }) => {
  // Initialize selectedKeys with an empty set
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  useEffect(() => {
    const updatedCategories = {};
    selectedKeys.forEach(key => {
      updatedCategories[key] = 1;
    });
    setSelectedCategories(updatedCategories);
  }, [selectedKeys, setSelectedCategories]);

  return (
    <div className="flex-1 min-w-[250px]">
      <label className="block text-sm font-medium text-gray-700 mb-1">Business Category</label>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize w-full">
            {'Select Business Categories'}
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Business Category Selection"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {businessCategories.map(category => (
            <DropdownItem key={category.key}>
              {category.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};