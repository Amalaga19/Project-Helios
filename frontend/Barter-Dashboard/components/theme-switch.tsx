// This file defines a ThemeSwitch component that allows users to toggle between light and dark modes.
"use client";

import { FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "../components/icons";

// Interface for the ThemeSwitch component's props.
export interface ThemeSwitchProps {
  className?: string; // Optional additional class names.
  classNames?: SwitchProps["classNames"]; // Optional class names for specific parts of the switch.
}

// The ThemeSwitch component definition.
export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme(); // Hook to get and set the current theme.
  const isSSR = useIsSSR(); // Hook to determine if server-side rendering is happening.

  const onChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR, // Determine if the switch is selected based on the current theme or SSR status.
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`, // Accessibility label for the switch.
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden> 
        <input {...getInputProps()} /> 
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR ? (
          <SunFilledIcon size={22} /> // Display sun icon for light mode.
        ) : (
          <MoonFilledIcon size={22} /> // Display moon icon for dark mode.
        )}
      </div>
    </Component>
  );
};