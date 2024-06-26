"use client";

import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';

const barrioCategories = [
  { key: 'central', label: 'Central' },
  { key: 'north', label: 'North' },
  { key: 'south', label: 'South' },
  { key: 'all', label: 'All Barrios' },
];

export const BarrioCategoryFilter = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['all']));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).map(key => barrioCategories.find(category => category.key === key)?.label).join(", "),
    [selectedKeys]
  );

  return (
    <div className="flex-1 min-w-[250px]">
      <label className="block text-sm font-medium text-gray-700 mb-1">Barrio Category</label>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" className="capitalize w-full">
            { 'Select Barrio Categories'}
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Barrio Category Selection"
          variant="flat"
          closeOnSelect={false}
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {barrioCategories.map(category => (
            <DropdownItem key={category.key}>
              {category.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
