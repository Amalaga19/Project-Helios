// Importing necessary hooks and components from React and NextUI.
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

// Importing the RenderCell component.
import { RenderCell } from "./render-cell";

// Defining the Business interface to type the business data.
interface Business {
  NAME: string;
  categories: string[];
  BARRIO: string;
  ADDRESS: string;
  LONGITUDE: string;
  LATITUDE: string;
}

// Defining the interface for the props expected by the TableComponent.
interface TableComponentProps {
  businesses: Business[]; // Array of businesses to display in the table.
}

// Defining the TableComponent functional component.
const TableComponent: React.FC<TableComponentProps> = ({ businesses = [] }) => {
  // Set a default value for businesses
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Define the number of rows per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(businesses.length / rowsPerPage);

  // Get the businesses for the current page
  const currentBusinesses = businesses.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  // Returning the JSX structure of the component.
  return (
    // Main container div with utility classes for styling.
    <div className="w-full flex flex-col gap-4">
      {/* Table component from NextUI with aria-label for accessibility. */}
      <Table aria-label="Businesses table">
        {/* TableHeader component containing TableColumn components for each column. */}
        <TableHeader>
          <TableColumn key="NAME">Name</TableColumn>
          <TableColumn key="categories">Category</TableColumn>
          <TableColumn key="BARRIO">Barrio</TableColumn>
          <TableColumn key="LOCATION">Location</TableColumn>
          <TableColumn key="LONGITUDE">Longitude</TableColumn>
          <TableColumn key="LATITUDE">Latitude</TableColumn>
        </TableHeader>
        {/* TableBody component containing TableRow components for each business. */}
        <TableBody items={currentBusinesses}>
          {(item: Business) => (
            <TableRow key={item.NAME}>
              {/* Rendering each cell in the row using the RenderCell component. */}
              {(columnKey) => (
                <TableCell>
                  <RenderCell
                    business={item}
                    columnKey={columnKey as keyof Business}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination component for navigating between pages. */}
      <Pagination
        initialPage={1}
        page={page}
        total={totalPages}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};

// Exporting the TableComponent as the default export.
export default TableComponent;
