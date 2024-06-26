"use client";
import MadridImage from '../../public/cities/Madrid.jpg';
import BarcelonaImage from '../../public/cities/Barcelona.png';
import SevillaImage from '../../public/cities/Sevilla.png';
import MalagaImage from '../../public/cities/Malaga.png';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import Image from "next/image";

import { StaticImageData } from "next/image";

interface City {
  name: string;
  imageSrc: StaticImageData;
}

export const CitiesDropdown = () => {
  const [city, setCity] = useState<City>({
    name: "Madrid",
    imageSrc: MadridImage,
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
              imageSrc: MadridImage,
            });
          }
          if (e === "2") {
            setCity({
              name: "Barcelona",
              imageSrc: BarcelonaImage,
            });
          }
          if (e === "3") {
            setCity({
              name: "Sevilla",
              imageSrc: SevillaImage,
            });
          }
          if (e === "4") {
            setCity({
              name: "Malaga",
              imageSrc: MalagaImage,
            });
          }
        }}
        aria-label="City Selection"
        variant="bordered" // Ensuring the dropdown is bordered
      >
        <DropdownItem
          key="1"
          startContent={
            <Image
              src={MadridImage}
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
              src={BarcelonaImage}
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
              src={SevillaImage}
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
              src={MalagaImage}
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
