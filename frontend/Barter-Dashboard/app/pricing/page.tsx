// app/pricing/page.tsx
"use client";

import React from "react";

import PricingCard from "@/components/PricingCard";
import { title } from "@/components/primitives";

import MainLayout from "../layouts/MainLayout";

export default function PricingPage() {
  const handlePersonalClick = () => {
    alert("Personal plan selected");
  };

  const handleEnterpriseClick = () => {
    alert("Enterprise plan selected");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-12 px-4 md:py-16 md:px-8">
      <div
        className="w-full max-w-screen-md text-center"
        style={{ overflow: "visible" }}
      >
        <h1
          className={title({ class: "lg:text-7xl md:text-6xl mb-2 block" })}
          style={{ verticalAlign: "bottom", lineHeight: "1.2" }}
        >
          Pricing
        </h1>
        <p className="mt-2 text-xl mb-8 max-w-screen-md mx-auto">
          Choose the plan that suits you best. Start with a free trial or
          subscribe to our enterprise plan for full access to all features.
        </p>
      </div>
      <div className="max-w-[900px] gap-8 grid grid-cols-12 px-8 mt-4">
        <div className="col-span-12 sm:col-span-6">
          <PricingCard
            buttonText="Start Free Trial"
            description="Basic access with free trial"
            features={[
              "7 days free trial",
              "Basic API Access",
              "2 Categories of Businesses",
              "Data for Madrid only",
            ]}
            price="€10 per month"
            title="Personal"
            onClick={handlePersonalClick}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <PricingCard
            buttonText="Subscribe Now"
            description="Advanced features for businesses"
            features={[
              "Team of at least 10 members required",
              "Advanced API Access",
              "All Business Categories and Subcategories",
              "Data for Malaga and Barcelona",
            ]}
            price="From €30 per month"
            title="Enterprise"
            onClick={handleEnterpriseClick}
          />
        </div>
      </div>
    </section>
  );
}

PricingPage.getLayout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
