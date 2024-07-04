import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

import { useAuth } from "@/app/hooks/useAuth";

import barterLogo from "../icons/sidebar/barter_logo.png"; // Make sure this path is correct

import { DarkModeSwitch } from "./darkmodeswitch";

export const SidebarUserDropdown = () => {
  const { auth, logout } = useAuth();

  const handleAction = async (actionKey: React.Key) => {
    if (actionKey === "logout") {
      try {
        await logout();
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
    console.log({ actionKey });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as="button"
          size="sm"
          src={barterLogo as any} // Use the imported image here with type assertion
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu actions" onAction={handleAction}>
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{auth.userId || "username@example.com"}</p>
        </DropdownItem>
        <DropdownItem key="configurations">My Downloads</DropdownItem>
        <DropdownItem key="logout" className="text-danger " color="danger">
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
          Toggle Dark Mode
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
