"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface City {
  name: string;
  imageSrc: string;
}

export const CitiesDropdown = () => {
  const [city, setCity] = useState<City>({
    name: "Madrid",
    imageSrc: "/cities/Madrid.jpg",
  });

  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2 p-2 border border-default-300 rounded-lg min-w-[200px]">
          <Image
            src={city.imageSrc}
            alt={city.name}
            width={42}
            height={42}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-medium m-0 text-default-900">
              {city.name}
            </h3>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(e) => {
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
        aria-label="City Selection"
        variant="bordered"
      >
        <DropdownItem
          key="1"
          startContent={
            <Image
              src="/cities/Madrid.jpg"
              alt="Madrid"
              width={42}
              height={42}
              className="rounded-full"
            />
          }
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
        >
          Madrid
        </DropdownItem>
        <DropdownItem
          key="2"
          startContent={
            <Image
              src="/cities/Barcelona.png"
              alt="Barcelona"
              width={42}
              height={42}
              className="rounded-full"
            />
          }
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
        >
          Barcelona
        </DropdownItem>
        <DropdownItem
          key="3"
          startContent={
            <Image
              src="/cities/Sevilla.png"
              alt="Sevilla"
              width={42}
              height={42}
              className="rounded-full"
            />
          }
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
        >
          Sevilla
        </DropdownItem>
        <DropdownItem
          key="4"
          startContent={
            <Image
              src="/cities/Malaga.png"
              alt="Malaga"
              width={42}
              height={42}
              className="rounded-full"
            />
          }
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
        >
          Malaga
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
