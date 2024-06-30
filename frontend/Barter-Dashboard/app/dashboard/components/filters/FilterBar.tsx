"use client";

import React from 'react';
import { BusinessCategoryFilter } from './BusinessCategoryFilter';
import SeeBusinessesButton from './SeeBusinessesButton';

export const FilterBar = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-default-300">
      <h2 className="text-xl font-bold mb-4">Filter Options</h2>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <BusinessCategoryFilter />
        </div>
        <div className="self-end">
          <SeeBusinessesButton />
        </div>
      </div>
    </div>
  );
};
