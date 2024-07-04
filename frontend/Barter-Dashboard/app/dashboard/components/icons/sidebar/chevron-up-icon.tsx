// Importing React to use React components and types.
import React from "react";

// Defining the Props interface, extending React's SVGAttributes for SVGElement.
interface Props extends React.SVGAttributes<SVGElement> {}

// Defining the ChevronUpIcon functional component.
export const ChevronUpIcon = ({ ...props }: Props) => {
  // Returning the JSX structure of the component.
  return (
    // SVG element defining the chevron-up icon.
    // Spreading any additional props passed to the component.
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Path element defining the shape of the chevron-up icon. */}
      <path
        className="fill-default-400"
        d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"
      />
    </svg>
  );
};
