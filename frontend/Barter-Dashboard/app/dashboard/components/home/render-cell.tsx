// Importing Tooltip component from NextUI and React library.
import { Tooltip } from "@nextui-org/react";
import React from "react";

// Defining the Props interface for the RenderCell component.
interface Props {
  business: any; // The business object containing data for each row.
  columnKey: string | React.Key; // The key of the column to render.
}

// Defining the RenderCell functional component.
export const RenderCell = ({ business, columnKey }: Props) => {
  // Getting the value of the current cell based on the columnKey.
  const cellValue = business[columnKey as keyof typeof business];

  // Switch statement to determine how to render the cell based on the columnKey.
  switch (columnKey) {
    case "NAME":
      // Rendering the cell value for the "NAME" column as a simple span.
      return <span>{cellValue}</span>;
    case "categories":
      // Rendering the cell value for the "categories" column, joining array elements with a comma.
      return <span>{cellValue.join(", ")}</span>;
    case "BARRIO":
      // Rendering the cell value for the "BARRIO" column as a simple span.
      return <span>{cellValue}</span>;
    case "ADDRESS":
      // Rendering the cell value for the "ADDRESS" column within a Tooltip.
      return <Tooltip content={cellValue}>{cellValue}</Tooltip>;
    case "LONGITUDE":
      // Rendering the cell value for the "LONGITUDE" column as a simple span.
      return <span>{cellValue}</span>;
    case "LATITUDE":
      // Rendering the cell value for the "LATITUDE" column as a simple span.
      return <span>{cellValue}</span>;
    default:
      // Returning the cell value directly for any columns not specifically handled.
      return cellValue;
  }
};
