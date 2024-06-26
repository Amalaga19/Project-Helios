"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "./table";
import { CardBarrios } from "./card-barrios";
import NextLink from "next/link";
import { FilterBar } from "../filters/FilterBar"; // Updated the import path for FilterBar

const MapComponent = dynamic(() => import('./Map'), {
  suspense: true,
  ssr: false,
  loading: () => <p>Loading...</p>
});

const MapSection = () => (
  <div className="h-full flex flex-col gap-2" style={{ width: '60%' }}>
    <h3 className="text-2xl font-bold">Business Map</h3>
    <div className="h-full bg-default-50 shadow-lg rounded-2xl p-6 flex-1">
      <Suspense fallback={<div>Loading...</div>}>
        <MapComponent />
      </Suspense>
    </div>
  </div>
);

const BarriosSection = () => (
  <div className="h-full flex flex-col gap-2" style={{ width: '40%' }}>
    <h3 className="text-2xl font-bold">Total Amount of Businesses by Barrio</h3>
    <div className="h-full bg-default-50 shadow-lg rounded-2xl p-6 flex-1 overflow-y-auto">
      <CardBarrios />
    </div>
  </div>
);

export const Content = () => (
  <div className="h-full lg:px-6">
    <FilterBar />
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <MapSection />
      <BarriosSection />
    </div>
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
      <div className="flex flex-wrap justify-between">
        <h3 className="text-center text-2xl font-bold">Business' Details</h3>
        <NextLink href="/accounts" legacyBehavior>
          <a className="cursor-pointer hover:underline focus:outline-none text-primary">
            Download CSV
          </a>
        </NextLink>
      </div>
      <TableWrapper />
    </div>
  </div>
);