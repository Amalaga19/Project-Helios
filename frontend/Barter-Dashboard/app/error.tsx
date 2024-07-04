// This directive indicates that this file is a client-side rendered component.
"use client";

// Importing the useEffect hook from React to perform side effects in the component.
import { useEffect } from "react";

// Defining the Error component which takes error and reset as props.
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Using the useEffect hook to perform a side effect when the error changes.
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error); // Logging the error to the console.
  }, [error]); // Dependency array ensures this effect runs whenever the error changes.

  // Returning the JSX structure of the component.
  return (
    <div>
       {/* Displaying a message to inform the user that something went wrong. */}
      <h2>Something went wrong!</h2>
      {/* Button to allow the user to attempt to recover from the error by re-rendering the component. */}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
