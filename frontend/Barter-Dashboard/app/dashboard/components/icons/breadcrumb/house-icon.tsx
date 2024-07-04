// Importing React to use React components.
import React from "react";

// Defining the HouseIcon functional component.
export const HouseIcon = () => {
  // Returning the JSX structure of the component.
  return (
    // SVG element defining the house icon.
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Path element defining the shape of the house icon. */}
      <path
        className="fill-default-400"
        clipRule="evenodd"
        d="M10.0001 19.0002V14.0002H14.0001V19.0002C14.0001 19.5502 14.4501 20.0002 15.0001 20.0002H18.0001C18.5501 20.0002 19.0001 19.5502 19.0001 19.0002V12.0002H20.7001C21.1601 12.0002 21.3801 11.4302 21.0301 11.1302L12.6701 3.60021C12.2901 3.26021 11.7101 3.26021 11.3301 3.60021L2.9701 11.1302C2.6301 11.4302 2.8401 12.0002 3.3001 12.0002H5.0001V19.0002C5.0001 19.5502 5.4501 20.0002 6.0001 20.0002H9.0001C9.5501 20.0002 10.0001 19.5502 10.0001 19.0002Z"
        fill="#969696"
        fillRule="evenodd"
      />
    </svg>
  );
};
