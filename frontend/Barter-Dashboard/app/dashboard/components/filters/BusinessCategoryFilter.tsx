"use client";
import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';

const businessCategories = [
  { key: 'restaurant', label: 'Restaurant' },
  { key: 'cafe', label: 'Cafe' },
  { key: 'store', label: 'Store' },
  { key: 'all', label: 'All Businesses' },
];

export const BusinessCategoryFilter = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['all']));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).map(key => businessCategories.find(category => category.key === key)?.label).join(", "),
    [selectedKeys]
  );

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
