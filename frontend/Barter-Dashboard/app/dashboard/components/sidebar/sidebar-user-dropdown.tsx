import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";

// Import custom hook for authentication
import { useAuth } from "@/app/hooks/useAuth";
// Import the Barter logo image
import barterLogo from "../icons/sidebar/barter_logo.png"; // Make sure this path is correct
// Import DarkModeSwitch component
import { DarkModeSwitch } from "./darkmodeswitch";
// Import function to log out the user
import { logoutUser } from "@/utils/api";

// Define and export the SidebarUserDropdown component
export const SidebarUserDropdown = () => {
  // Destructure auth and logout from useAuth hook
  const { auth, logout } = useAuth();
    // If the action is to log out
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
    // Render the dropdown menu
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
          <p>{auth.userId || "username@example.com"}</p> {/* Display user ID or a placeholder */}
        </DropdownItem>
        <DropdownItem key="configurations">My Downloads</DropdownItem>
        <DropdownItem key="logout" className="text-danger " color="danger" onClick={logoutUser}> 
          Log Out 
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch /> {/* Render the DarkModeSwitch component */}
          Toggle Dark Mode
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
