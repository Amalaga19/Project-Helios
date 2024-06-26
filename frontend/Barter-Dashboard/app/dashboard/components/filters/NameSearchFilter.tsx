import React from 'react';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '../icons/searchicon'; // Assuming you have a search icon

export const NameSearchFilter = () => {
  return (
    <div className="flex-1 min-w-[250px]">
      <Input
        startContent={<SearchIcon />}
        isClearable
        className="w-full"
        classNames={{
          input: "w-full",
          mainWrapper: "w-full",
        }}
        label="Search by Business Name"
        labelPlacement="outside"
        placeholder="Search..."
      />
    </div>
  );
};
