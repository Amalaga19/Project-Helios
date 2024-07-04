// Importing useEffect and useLayoutEffect hooks from React.
import { useEffect, useLayoutEffect } from "react";

// Defining the useIsomorphicLayoutEffect hook.
// This hook will use useLayoutEffect if the window object is defined (indicating that the code is running in the browser).
// Otherwise, it will use useEffect (which is safe to use on the server side).
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

  