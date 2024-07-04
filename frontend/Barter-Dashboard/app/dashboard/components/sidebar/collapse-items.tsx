// This directive indicates that this file is a client-side rendered component.
"use client";
// Importing necessary hooks and components from React and NextUI.
import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

// Importing the ChevronUpIcon component.
import { ChevronUpIcon } from "../icons/sidebar/chevron-up-icon";

// Defining the Props interface for the CollapseItems component.
interface Props {
  icon: React.ReactNode; // The icon to display next to the title.
  title: string; // The title of the collapse item.
  items: string[]; // The list of items to display when the collapse item is expanded.
}

// Defining the CollapseItems functional component.
export const CollapseItems = ({ icon, items, title }: Props) => {
  // Using useState to manage the open state of the collapse item.
  const [open, setOpen] = useState(false);

  // Returning the JSX structure of the component.
  return (
    // Accordion component to create the collapse item.
    <div className="flex gap-4 h-full items-center cursor-pointer">
      {/* Accordion component for creating collapsible sections. */}
      <Accordion className="px-0">
        {/* AccordionItem component representing an individual collapsible section. */}
        <AccordionItem
          aria-label="Accordion 1" // Aria label for accessibility.
          classNames={{
            indicator: "data-[open=true]:-rotate-180", // Indicator class for the collapse icon.
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5", // Trigger class for the collapse item.

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer", // Title class for the collapse item.
          }}
          indicator={<ChevronUpIcon />} // Indicator icon for the collapse item.
          title={
            // Title section with icon and text.
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          {/* Content to display when the accordion is open. */}
          <div className="pl-12">
            {/* Mapping over the items array to create a span for each item. */}
            {items.map((item, index) => (
              <span
                key={index} // Unique key for each item.
                className="w-full flex  text-default-500 hover:text-default-900 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
