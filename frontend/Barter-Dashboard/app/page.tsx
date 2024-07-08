// This directive indicates that this file is a client-side rendered component.
"use client";

// Importing necessary modules and components from React and NextUI library.
import React, { useState } from "react";
import { Card, CardHeader, Image } from "@nextui-org/react";

// Importing custom title and subtitle components from the local primitives file.
import { title, subtitle } from "../components/primitives";

// Importing the main layout component which wraps around the page content.
import MainLayout from "./layouts/MainLayout";

// The Home component is defined as a default export.
export default function Home() {
  // useState hook is used to manage the state of the currently active card.
  // activeCard stores the index of the active card or null if no card is active.
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // handleCardClick function toggles the active state of a card when it is clicked.
  const handleCardClick = (index: number) => {
    setActiveCard(index === activeCard ? null : index);
  };

  const cards = [
    {
      title: "The Why",
      subtitle: "Understanding the need",
      img: "/pictures/bater-building.jpg",
      content: "Our goal is to optimize the placement of solar panels and identify potential customers within Madrid.",
    },
    {
      title: "The What",
      subtitle: "Project Overview",
      img: "/pictures/barter-satellite.jpg",
      content: "We are analyzing areas within a 2km radius from a given point to provide strategic data on nearby businesses and the average solar radiation of the area.",
    },
    {
      title: "The How",
      subtitle: "Implementation Strategy",
      img: "/pictures/bater-car.jpg",
      content: "This involves integrating data from APIs into an MSSQL database, developing a backend with Flask, creating a frontend with React, and deploying the application using Google Cloud.",
    },
  ];

  // The return statement defines the JSX structure of the component.
  return (
    // Section element with utility classes for styling and layout.
    <section className="flex flex-col items-center justify-center gap-4 px-4 md:px-8">
      {/* Container for the main headings with styling for responsiveness. */}
      <div
        className="w-full max-w-screen-md text-center"
        style={{ overflow: "visible" }}
      >
        {/* Main project title with custom styles. */}
        <h1
          className={title({ class: "lg:text-7xl md:text-6xl mb-2 block" })}
          style={{ verticalAlign: "bottom", lineHeight: "1.2" }}
        >
          Project Helios
        </h1>
        {/* Secondary project title with different color and styles. */}
        <h1
          className={title({
            color: "violet",
            class: "lg:text-7xl md:text-6xl mt-2 block",
          })}
          style={{ verticalAlign: "bottom", lineHeight: "1.2" }}
        >
          Lighting up Madrid
        </h1>
        {/* Project description using the subtitle component with additional styling. */}
        <h2 className={subtitle({ class: "mt-2 leading-relaxed" })}>
          Designed to identify ideal areas for solar-powered generators in
          Madrid,
        </h2>
        <h2 className={subtitle({ class: "mt-2 leading-relaxed" })}>
          enabling efficient widespread adoption of renewable energy.
        </h2>
      </div>
      {/* Grid container for the card components, responsive with padding. */}
      <div className="max-w-[900px] gap-8 grid grid-cols-12 px-8 mt-8">
        {/* Mapping over the cards array to render each card component. */}
        {cards.map((card, index) => (
          // Card component from NextUI with interactivity and styling.
          <Card
            key={index}
            isPressable
            className="col-span-12 sm:col-span-4 h-[300px] group hover:scale-105 transition-transform duration-300"
            onPress={() => handleCardClick(index)}
          >
            {/* Card header with title and subtitle, positioned absolutely within the card. */}
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <h3 className="text-black uppercase font-bold">{card.title}</h3>
              <h4 className="text-black font-medium text-large">
                {card.subtitle}
              </h4>
            </CardHeader>
            {/* Card image with styling for full coverage and no wrapper. */}
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={card.img}
            />
            {/* Conditional rendering of card content overlay if the card is active. */}
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

// Custom layout for the Home component, wrapping it with MainLayout.
Home.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
