"use client";

import React, { useState } from "react";
import { title, subtitle } from "../components/primitives";
import { Card, CardHeader, Image } from "@nextui-org/react";

export default function Home() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(index === activeCard ? null : index);
  };

  const cards = [
    {
      title: "The Why",
      subtitle: "Understanding the need",
      img: "/pictures/bater-building.jpg",
      content: "Detailed explanation about the need for this project."
    },
    {
      title: "The What",
      subtitle: "Project Overview",
      img: "/pictures/barter-satellite.jpg",
      content: "Detailed project overview and scope."
    },
    {
      title: "The How",
      subtitle: "Implementation Strategy",
      img: "/pictures/bater-car.jpg",
      content: "Steps and strategies for implementing the project."
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-12 px-4 md:py-16 md:px-8">
      <div className="w-full max-w-screen-md text-center" style={{ overflow: 'visible' }}>
        <h1 className={title({ class: "lg:text-7xl md:text-6xl mb-2 block" })} style={{ verticalAlign: 'bottom', lineHeight: '1.2' }}>
          Project Helios
        </h1>
        <h1 className={title({ color: "violet", class: "lg:text-7xl md:text-6xl mt-2 block" })} style={{ verticalAlign: 'bottom', lineHeight: '1.2' }}>
          Lighting up Madrid
        </h1>
        <h2 className={subtitle({ class: "mt-2 leading-relaxed" })}>
          Designed to identify ideal areas for solar-powered generators in Madrid,
        </h2>
        <h2 className={subtitle({ class: "mt-2 leading-relaxed" })}>
          enabling efficient widespread adoption of renewable energy.
        </h2>
      </div>
      <div className="max-w-[900px] gap-8 grid grid-cols-12 px-8 mt-8">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="col-span-12 sm:col-span-4 h-[300px] group hover:scale-105 transition-transform duration-300"
            isPressable
            onPress={() => handleCardClick(index)}
          >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <h3 className="text-black uppercase font-bold">{card.title}</h3>
              <h4 className="text-black font-medium text-large">{card.subtitle}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={card.img}
            />
            {activeCard === index && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white p-4">
                {card.content}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

Home.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
