// Importing React to use React components.
import React from "react";
// Importing the useTheme hook from next-themes to handle theme switching.
import { useTheme as useNextTheme } from "next-themes";
// Importing the Switch component from NextUI.
import { Switch } from "@nextui-org/react";

// Defining the DarkModeSwitch functional component.
export const DarkModeSwitch = () => {
  // Using the useNextTheme hook to access and set the current theme.
  const { setTheme, resolvedTheme } = useNextTheme();

  // Returning the JSX structure of the component.
  return (
    // Switch component for toggling between dark and light modes.
    <Switch
      // Setting the isSelected prop based on the current resolved theme.
      isSelected={resolvedTheme === "dark" ? true : false}
      // Handling value changes to switch themes.
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
    />
  );
};
