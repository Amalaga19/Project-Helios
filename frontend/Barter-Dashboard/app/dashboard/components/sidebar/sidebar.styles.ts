// Importing the tv utility from the @nextui-org/react library for styled components.
import { tv } from "@nextui-org/react";

// Importing the tv utility from the @nextui-org/react library for styled components.
export const SidebarWrapper = tv({
  base: "bg-background transition-transform h-full fixed -translate-x-full w-64 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 md:ml-0 md:flex md:static md:h-screen md:translate-x-0 ",

  variants: {
    collapsed: {
      true: "translate-x-0 ml-0 [display:inherit]",
    },
  },
});
// Styled component for the overlay background when the sidebar is active
export const Overlay = tv({
  base: "bg-[rgb(15_23_42/0.3)] fixed inset-0 z-[201] opacity-80 transition-opacity md:hidden md:z-auto md:opacity-100",
});

// Styled component for the sidebar header
export const Header = tv({
  base: "flex gap-8 items-center px-6",
});

// Styled component for the sidebar body
export const Body = tv({
  base: "flex flex-col gap-6 mt-9 px-2",
});

// Styled component for the sidebar footer
export const Footer = tv({
  base: "flex items-center justify-center gap-6 pt-16 pb-8 px-8 md:pt-10 md:pb-0",
});

// Composite Sidebar component that includes Header, Body, Overlay, and Footer
export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Footer,
});
