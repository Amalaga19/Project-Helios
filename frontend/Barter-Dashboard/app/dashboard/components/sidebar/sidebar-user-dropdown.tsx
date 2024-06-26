import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
  } from "@nextui-org/react";
  import React from "react";
  import { DarkModeSwitch } from "./darkmodeswitch";
  
  export const SidebarUserDropdown = () => {
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
          onAction={(actionKey) => console.log({ actionKey })}
        >
          <DropdownItem
            key="profile"
            className="flex flex-col justify-start w-full items-start"
          >
            <p>Signed in as</p>
            <p>zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
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
  