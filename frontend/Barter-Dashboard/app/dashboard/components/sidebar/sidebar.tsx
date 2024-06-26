"use client";
import React from "react";
import { Sidebar } from "./sidebar.styles";
import { CitiesDropdown } from "./cities-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { SidebarUserDropdown } from "./sidebar-user-dropdown"; // Make sure the path is correct

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0 flex flex-col justify-between">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div className={Sidebar.Header()}>
          <CitiesDropdown />
        </div>
        <div className="flex-grow">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
          </div>
        </div>
        <div className="p-4 flex justify-around items-center">
          <a
            href="https://github.com/Siumauricio/nextui-dashboard-template"
            target="_blank"
            className="flex items-center"
          >
            <GithubIcon />
          </a>
          <SidebarUserDropdown />
        </div>
      </div>
    </aside>
  );
};
