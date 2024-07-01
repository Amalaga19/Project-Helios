// app/pricing/page.tsx
'use client';

import React from 'react';
import PricingCard from '@/components/PricingCard';
import PricingLayout from './layout';
import { title } from "@/components/primitives";

export default function PricingPage() {
  const handlePersonalClick = () => {
    alert('Personal plan selected');
  };

  const handleEnterpriseClick = () => {
    alert('Enterprise plan selected');
  };

  return (
    <PricingLayout>
      <h1 className={title({ color: "violet", class: "lg:text-7xl md:text-6xl mt-2 block mb-4" })} style={{ verticalAlign: 'bottom', lineHeight: '1.2' }}>
        Pricing
      </h1>
      <p className="mt-4 text-xl mb-8 max-w-screen-md mx-auto">
        Choose the plan that suits you best. Start with a free trial or subscribe to our enterprise plan for full access to all features.
      </p>
      <div className="flex flex-wrap justify-center mt-8 gap-6">
        <PricingCard
          title="Personal"
          price="€10 per month"
          description="Basic access with free trial"
          features={[
            "7 days free trial",
            "Basic API Access",
            "2 Categories of Businesses",
            "Data for Madrid only"
          ]}
          buttonText="Start Free Trial"
          onClick={handlePersonalClick}
        />
        <PricingCard
          title="Enterprise"
          price="From €30 per month"
          description="Advanced features for businesses"
          features={[
            "Team of at least 10 members required",
            "Advanced API Access",
            "All Business Categories and Subcategories",
            "Data for Malaga and Barcelona",
            
          ]}
          buttonText="Subscribe Now"
          onClick={handleEnterpriseClick}
        />
      </div>
    </PricingLayout>
  );
}
