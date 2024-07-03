// sidebar.tsx
"use client";
import React from "react";
import { usePathname } from "next/navigation";

import { HomeIcon } from "../icons/sidebar/home-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { useSidebarContext } from "../layout/layout-context";

import { Sidebar } from "./sidebar.styles";
import { CitiesDropdown } from "./cities-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarUserDropdown } from "./sidebar-user-dropdown"; // Make sure the path is correct

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      setCollapsed();
    }
  };

  return (
    <aside className="h-screen z-[20] sticky top-0 flex flex-col justify-between">
      {collapsed ? (
        <div
          className={Sidebar.Overlay()}
          onClick={setCollapsed}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Collapse sidebar"
        />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <div className={Sidebar.Header()}>
          <CitiesDropdown />
        </div>
        <div className="flex-grow">
          <div className={Sidebar.Body()}>
            <SidebarItem
              href="/"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              title="Home"
            />
          </div>
        </div>
        <div className="p-4 flex justify-around items-center">
          <a
            className="flex items-center"
            href="https://github.com/Siumauricio/nextui-dashboard-template"
            target="_blank"
          >
            <GithubIcon />
          </a>
          <SidebarUserDropdown />
        </div>
      </div>
    </aside>
  );
};