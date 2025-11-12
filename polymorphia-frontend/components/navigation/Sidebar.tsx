"use client";

import UserSection from "@/components/navigation/UserSection";
import Line from "@/components/navigation/Line";
import MenuSection from "@/components/navigation/MenuSection";
import { useEffect, useRef } from "react";
import "./index.css";
import clsx from "clsx";
import { animateSidebar } from "@/animations/Navigation";
import useNavigationContext from "@/hooks/contexts/useNavigationContext";
import {
  useBottomDesktopMenuItems,
  useMainMenuItems,
} from "@/hooks/general/useMenuOptions";

export default function Sidebar() {
  const {
    isSidebarExpanded,
    setIsSidebarExpanded,
    isSidebarLockedOpened,
    isSidebarLockedClosed,
  } = useNavigationContext();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) {
      return;
    }

    animateSidebar(sidebar, isSidebarExpanded);
  }, [isSidebarExpanded]);

  const menuItems = useMainMenuItems();
  const bottomMenuItems = useBottomDesktopMenuItems();

  return (
    <div
      ref={sidebarRef}
      id={isSidebarLockedOpened ? "sidebar-locked" : "sidebar-animated"}
      className="sidebar"
      onMouseEnter={() => {
        if (!isSidebarLockedOpened && !isSidebarLockedClosed) {
          setIsSidebarExpanded(true);
        }
      }}
      onMouseLeave={() => {
        if (!isSidebarLockedOpened && !isSidebarLockedClosed) {
          setIsSidebarExpanded(false);
        }
      }}
    >
      <UserSection />
      <Line />
      <div
        className={clsx(
          `sidebar-menu-section-base ${
            isSidebarExpanded ? "sidebar-menu-section-expanded" : ""
          }`
        )}
      >
        <MenuSection options={menuItems} />
      </div>
      <div>
        <Line />
        <MenuSection options={bottomMenuItems} />
      </div>
    </div>
  );
}
