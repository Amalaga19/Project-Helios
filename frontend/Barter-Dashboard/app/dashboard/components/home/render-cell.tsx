// render-cell.tsx
import { Tooltip } from "@nextui-org/react";
import React from "react";
import { users } from "./data";

interface Props {
  user: (typeof users)[number];
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey as keyof typeof user];
  switch (columnKey) {
    case "name":
      return <span>{cellValue}</span>;
    case "category":
      return <span>{cellValue}</span>;
    case "barrio":
      return <span>{cellValue}</span>;
    case "address":
      return <Tooltip content={cellValue}>{cellValue}</Tooltip>;
    case "longitude":
      return <span>{cellValue}</span>;
    case "latitude":
      return <span>{cellValue}</span>;
    default:
      return cellValue;
  }
};
