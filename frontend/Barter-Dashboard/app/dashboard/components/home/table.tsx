// components/TableComponent.tsx
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { RenderCell } from './render-cell';

const TableComponent = ({ businesses = [] }) => { // Set a default value for businesses
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Define the number of rows per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(businesses.length / rowsPerPage);

  // Get the businesses for the current page
  const currentBusinesses = businesses.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Businesses table">
        <TableHeader>
          <TableColumn key="NAME">Name</TableColumn>
          <TableColumn key="categories">Category</TableColumn>
          <TableColumn key="BARRIO">Barrio</TableColumn>
          <TableColumn key="ADDRESS">Address</TableColumn>
          <TableColumn key="LONGITUDE">Longitude</TableColumn>
          <TableColumn key="LATITUDE">Latitude</TableColumn>
        </TableHeader>
        <TableBody items={currentBusinesses}>
          {(item) => (
            <TableRow key={item.NAME}>
              {(columnKey) => (
                <TableCell>
                  <RenderCell business={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        total={totalPages}
        initialPage={1}
        page={page}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};

export default TableComponent;
