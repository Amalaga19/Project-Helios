"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "./table";
import { CardTransactions } from "./card-transactions";
import NextLink from "next/link";

const MapComponent = dynamic(() => import('./Map'), {
  suspense: true,
  ssr: false,
  loading: () => <p>Loading...</p>
});

const MapSection = () => (
  <div className="h-full flex flex-col gap-2">
    <h3 className="text-2xl font-bold">Business Map</h3>
    <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <MapComponent />
      </Suspense>
    </div>
  </div>
);

const TransactionSection = () => (
  <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
    <h3 className="text-2xl font-bold">Section</h3>
    <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
      <CardTransactions />
    </div>
  </div>
);

export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <MapSection />
      <TransactionSection />
    </div>
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
      <div className="flex flex-wrap justify-between">
        <h3 className="text-center text-2xl font-bold">Latest Users</h3>
        <NextLink href="/accounts" legacyBehavior>
          <a className="cursor-pointer hover:underline focus:outline-none text-primary">
            View All
          </a>
        </NextLink>
      </div>
      <TableWrapper />
    </div>
  </div>
);
