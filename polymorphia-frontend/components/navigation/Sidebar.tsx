"use client";
import UserSection from "@/components/navigation/UserSection";
import Line from "@/components/navigation/Line";
import MenuSection from "@/components/navigation/MenuSection";
import { BottomDesktopMenuItems, MainMenuItems } from "@/components/navigation/MenuOptions";
import { useContext, useEffect, useRef } from "react";
import { NavigationContext } from "@/components/providers/navigation/NavigationContext";
import "./index.css";

import clsx from "clsx";
import { animateSidebar } from "@/animations/Navigation";
import { updateMenuItems } from "@/components/course/event-section/EventSectionUtils";
import useEventSections from "@/hooks/course/useEventSections";

export default function Sidebar() {
  const {
    isSidebarExpanded,
    setIsSidebarExpanded,
    isSidebarLockedOpened,
    isSidebarLockedClosed,
  } = useContext(NavigationContext);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { data: eventSections } = useEventSections();

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) {
      return;
    }

    animateSidebar(sidebar, isSidebarExpanded);
  }, [isSidebarExpanded]);

  const menuItems = [...MainMenuItems];

  if (eventSections) {
    updateMenuItems(menuItems, eventSections);
  }

  return (
    <div
      ref={sidebarRef}
      id={isSidebarLockedOpened ? "sidebar-locked" : "sidebar-animated"}
      className="sidebar"
      onMouseEnter={() => {
        if (!isSidebarLockedOpened && !isSidebarLockedClosed)
          setIsSidebarExpanded(true);
      }}
      onMouseLeave={() => {
        if (!isSidebarLockedOpened && !isSidebarLockedClosed)
          setIsSidebarExpanded(false);
      }}
    >
      <UserSection />
      <Line />
      <div
        className={clsx(
          `sidebar-menu-section-base ${
            isSidebarExpanded ? "sidebar-menu-section-expanded" : ""
          }`,
        )}
      >
        <MenuSection options={menuItems} />
      </div>
      <div>
        <Line />
        <MenuSection options={BottomDesktopMenuItems} />
      </div>
    </div>
  );
}
