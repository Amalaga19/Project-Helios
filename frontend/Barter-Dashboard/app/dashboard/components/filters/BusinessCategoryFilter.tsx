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

interface BusinessCategoryFilterProps {
  selectedCategories: { [key: string]: number };
  setSelectedCategories: (categories: { [key: string]: number }) => void;
}

export const BusinessCategoryFilter: React.FC<BusinessCategoryFilterProps> = ({ selectedCategories = {}, setSelectedCategories }) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updatedCategories: { [key: string]: number } = {};
    selectedKeys.forEach(key => {
      updatedCategories[key] = 1;
    });
    setSelectedCategories(updatedCategories);
  }, [selectedKeys, setSelectedCategories]);

  const handleSelectionChange = (keys: any) => {
    if (Array.isArray(keys)) {
      setSelectedKeys(new Set(keys as string[]));
    } else if (typeof keys === 'string') {
      setSelectedKeys(new Set([keys]));
    } else if (keys && typeof keys === 'object' && keys.currentKey) {
      setSelectedKeys(new Set([keys.currentKey]));
    }
  };

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
          selectedKeys={Array.from(selectedKeys)}
          onSelectionChange={handleSelectionChange}
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