"use client";

import React from 'react';
import { BusinessCategoryFilter } from './BusinessCategoryFilter';
import { BarrioCategoryFilter } from './BarrioCategoryFilter';
import { NameSearchFilter } from './NameSearchFilter';
import { ZipCodeSearchFilter } from './ZipCodeSearchFilter';

export const FilterBar = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-default-300">
      <h2 className="text-xl font-bold mb-4">Filter Options</h2>
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <NameSearchFilter />
        <ZipCodeSearchFilter />
        <BusinessCategoryFilter />
        <BarrioCategoryFilter />
      </div>
    </div>
  );
};
