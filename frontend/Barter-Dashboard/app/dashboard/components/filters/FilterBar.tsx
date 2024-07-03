"use client";

import React from 'react';
import { BusinessCategoryFilter } from './BusinessCategoryFilter';

interface FilterBarProps {
  selectedCategories: { [key: string]: number };
  setSelectedCategories: (categories: { [key: string]: number }) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ selectedCategories, setSelectedCategories }) => {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-default-300">
      <h2 className="text-xl font-bold mb-4">Filter Options</h2>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <BusinessCategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>
    </div>
  );
};
