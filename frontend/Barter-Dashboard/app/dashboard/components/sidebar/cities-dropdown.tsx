// This directive indicates that this file is a client-side rendered component.
"use client";
// Importing necessary hooks and components from React and Next.js.
import React, { useState } from "react";
import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

// Defining the City interface to type the city data.
interface City {
  name: string;
  imageSrc: string;
}

// Defining the CitiesDropdown functional component.
export const CitiesDropdown = () => {
  // Using useState to manage the selected city state.
  const [city, setCity] = useState<City>({
    name: "Madrid",
    imageSrc: "/cities/Madrid.jpg",
  });

  // Returning the JSX structure of the component.
  return (
    // Dropdown component with custom class names for styling.
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      {/* DropdownTrigger component to open the dropdown menu. */}
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2 p-2 border border-default-300 rounded-lg min-w-[200px]">
          {/* Image component to display the selected city's image. */}
          <Image
            alt={city.name}
            className="rounded-full"
            height={42}
            src={city.imageSrc}
            width={42}
          />
          {/* Container div for the selected city's name. */}
          <div className="flex flex-col">
            <h3 className="text-xl font-medium m-0 text-default-900">
              {city.name}
            </h3>
          </div>
        </div>
      </DropdownTrigger>
      {/* DropdownMenu component to list city options. */}
      <DropdownMenu
        aria-label="City Selection"
        variant="bordered"
        onAction={(e) => {
          // Handle city selection based on the action key.
          if (e === "1") {
            setCity({
              name: "Madrid",
              imageSrc: "/cities/Madrid.jpg",
            });
          }
          if (e === "2") {
            setCity({
              name: "Barcelona",
              imageSrc: "/cities/Barcelona.png",
            });
          }
          if (e === "3") {
            setCity({
              name: "Sevilla",
              imageSrc: "/cities/Sevilla.png",
            });
          }
          if (e === "4") {
            setCity({
              name: "Malaga",
              imageSrc: "/cities/Malaga.png",
            });
          }
        }}
      >
        {/* DropdownItem component for each city option. */}
        <DropdownItem
          key="1"
          classNames={{
            base: "py-4", // Base class for padding
            title: "text-base font-semibold", // Title class for font styling
          }}
          startContent={
            // Image component for Madrid
            <Image
              alt="Madrid" // Alt text for Madrid image
              className="rounded-full" // Rounded class for border radius
              height={42} // Height of the image
              src="/cities/Madrid.jpg" // Source of the image
              width={42} // Width of the image
            />
          }
        >
          Madrid
        </DropdownItem>
        <DropdownItem
          key="2"
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
          startContent={
            <Image
              alt="Barcelona"
              className="rounded-full"
              height={42}
              src="/cities/Barcelona.png"
              width={42}
            />
          }
        >
          Barcelona
        </DropdownItem>
        <DropdownItem
          key="3"
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
          startContent={
            <Image
              alt="Sevilla"
              className="rounded-full"
              height={42}
              src="/cities/Sevilla.png"
              width={42}
            />
          }
        >
          Sevilla
        </DropdownItem>
        <DropdownItem
          key="4"
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
          startContent={
            <Image
              alt="Malaga"
              className="rounded-full"
              height={42}
              src="/cities/Malaga.png"
              width={42}
            />
          }
        >
          Malaga
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
