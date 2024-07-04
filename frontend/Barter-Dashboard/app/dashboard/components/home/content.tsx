"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { saveAs } from "file-saver"; // Import file-saver
import { json2csv } from "json-2-csv"; // Import json2csv

import ProtectedRoute from "@/components/ProtectedRoute"; // Import ProtectedRoute

import { FilterBar } from "../filters/FilterBar";
import { SidebarWrapper } from "../sidebar/sidebar"; // Import SidebarWrapper

import TableComponent from "./table"; // Import the new TableComponent

const MapComponent = dynamic(() => import("./Map"), {
  suspense: true,
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const MapSection = ({
  selectedCategories,
  setSelectedCategories,
  setBusinesses,
}: {
  selectedCategories: { [key: string]: number };
  setSelectedCategories: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  setBusinesses: (businesses: any[]) => void;
}) => (
  <div className="h-full flex flex-col gap-2" style={{ width: "100%" }}>
    <h3 className="text-2xl font-bold">Business Map</h3>
    <div className="h-full bg-default-50 shadow-lg rounded-2xl p-6 flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <MapComponent
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          setBusinesses={setBusinesses}
        />
      </Suspense>
    </div>
  </div>
);

export const Content: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: number }>({
    catering: 0,
    commercial: 0,
    production: 0,
    service: 0,
    office: 0,
  });
  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    if (Object.keys(selectedCategories).length === 0) {
      setBusinesses([]); // Clear businesses if no categories are selected
    }
  }, [selectedCategories]);

  const generateCSV = async () => {
    try {
      const csv = await json2csv(businesses);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

      saveAs(blob, "businesses.csv");
    } catch (error) {
      console.error("Error generating CSV:", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="h-full lg:px-6 flex">
        <SidebarWrapper /> {/* Include SidebarWrapper here */}
        <div className="flex-grow px-4">
          {" "}
          {/* Add padding to the right of the sidebar */}
          <FilterBar
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
            <MapSection
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              setBusinesses={setBusinesses}
            />
          </div>
          <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
            <div className="flex flex-wrap justify-between">
              <h3 className="text-center text-2xl font-bold">
              {businesses.length > 0 ? `Detailed Results (${businesses.length} Businesses Found)` : "Select Categories and Click on the Map to See Businesses"}
              </h3>
              <button
                className="cursor-pointer hover:underline focus:outline-none text-primary"
                onClick={generateCSV}
              >
                Download CSV
              </button>
            </div>
            <TableComponent businesses={businesses} />{" "}
            {/* Pass businesses as a prop */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};