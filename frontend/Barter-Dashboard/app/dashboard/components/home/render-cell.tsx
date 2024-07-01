// components/RenderCell.tsx
import { Tooltip } from "@nextui-org/react";
import React from "react";

interface Props {
  business: any;
  columnKey: string | React.Key;
}

export const RenderCell = ({ business, columnKey }: Props) => {
  const cellValue = business[columnKey as keyof typeof business];
  switch (columnKey) {
    case "NAME":
      return <span>{cellValue}</span>;
    case "categories":
      return <span>{cellValue.join(', ')}</span>;
    case "BARRIO":
      return <span>{cellValue}</span>;
    case "ADDRESS":
      return <Tooltip content={cellValue}>{cellValue}</Tooltip>;
    case "LONGITUDE":
      return <span>{cellValue}</span>;
    case "LATITUDE":
      return <span>{cellValue}</span>;
    default:
      return cellValue;
  }
};
