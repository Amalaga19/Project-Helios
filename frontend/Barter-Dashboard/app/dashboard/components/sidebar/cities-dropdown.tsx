"use client";

import React, { useState } from "react";
import Image from "next/image";
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
            alt={city.name}
            className="rounded-full"
            height={42}
            src={city.imageSrc}
            width={42}
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-medium m-0 text-default-900">
              {city.name}
            </h3>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="City Selection"
        variant="bordered"
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
      >
        <DropdownItem
          key="1"
          classNames={{
            base: "py-4",
            title: "text-base font-semibold",
          }}
          startContent={
            <Image
              alt="Madrid"
              className="rounded-full"
              height={42}
              src="/cities/Madrid.jpg"
              width={42}
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
