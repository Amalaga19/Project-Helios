// components/PricingCard.tsx
'use client';

import React from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  onClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, description, features, buttonText, onClick }) => {
  return (
    <div className="border rounded-lg p-6 shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-violet-700">{title}</h2>
      <p className="text-4xl font-bold my-4 text-indigo-600">{price}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="text-left mb-6">
        {features.map((feature, index) => (
          <li key={index} className="my-2">
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 mt-4 hover:bg-indigo-700 transition"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
