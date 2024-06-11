"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../../../frontend/nextui-dashboard-template/components/table/table";
import { CardBalance1 } from "../../../frontend/nextui-dashboard-template/components/home/card-balance1";
import { CardBalance2 } from "../../../frontend/nextui-dashboard-template/components/home/card-balance2";
import { CardBalance3 } from "../../../frontend/nextui-dashboard-template/components/home/card-balance3";
import { CardAgents } from "../../../frontend/nextui-dashboard-template/components/home/card-agents";
import { CardTransactions } from "../../../frontend/nextui-dashboard-template/components/home/card-transactions";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import CreditInfo from "./CreditInfo"; // Importing the CreditInfo component

const Chart = dynamic(
  () => import("../../../frontend/nextui-dashboard-template/components/charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="flex flex-col gap-4 xl:gap-6 pt-3 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Credit Card Balance</h3>
      {/* Top Section with Credit Info and To-Do List */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <CreditInfo
            creditLimit="$50,000.00"
            currentBalance="$12,500.00"
            availableCredit="$37,500.00"
            lastPayment={{
              amount: "$2,500.00",
              date: "05/20/2024",
              method: "Bank Transfer",
              confirmationNumber: "123456789",
            }}
            nextPayment={{
              amount: "$1,500.00",
              dueDate: "06/15/2024",
            }}
            billingCycle="Monthly"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">To-do List</h3>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4">
              <ul className="list-disc pl-4 text-gray-900 dark:text-gray-100">
                <li>Approve 27 employee transactions</li>
                <li>Complete 4 transactions</li>
                <li>Approve 4 fund requests</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 gap-6 flex flex-col w-full">
        {/* Card Section Top */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Available Balance</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5 justify-center w-full">
            <CardBalance1 />
            <CardBalance2 />
            <CardBalance3 />
          </div>
        </div>

        {/* Chart */}
        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Statistics</h3>
          <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
            <Chart />
          </div>
        </div>
      </div>

      {/* Left Section */}
      <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Section</h3>
        <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
          <CardAgents />
          <CardTransactions />
        </div>
      </div>
    </div>

    {/* Table Latest Users */}
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
      <div className="flex flex-wrap justify-between">
        <h3 className="text-center text-xl font-semibold text-gray-900 dark:text-gray-100">Latest Users</h3>
        <Link
          href="/accounts"
          as={NextLink}
          color="primary"
          className="cursor-pointer text-blue-500"
        >
          View All
        </Link>
      </div>
      <TableWrapper />
    </div>
  </div>
);

export default Content;

