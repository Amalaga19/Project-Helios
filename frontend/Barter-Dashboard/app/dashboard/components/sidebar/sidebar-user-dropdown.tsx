import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { useAuth } from '@/app/hooks/useAuth';

export const SidebarUserDropdown = () => {
  const { auth, logout } = useAuth();

  const handleAction = async (actionKey: string) => {
    if (actionKey === "logout") {
      try {
        await logout();
        console.log('User logged out successfully');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
    console.log({ actionKey });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as="button"
          color="secondary"
          size="md"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={handleAction}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{auth.userId || 'username@example.com'}</p>
        </DropdownItem>
        <DropdownItem key="configurations">My Downloads</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger ">
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};