"use client"
import UserSection from "@/components/navigation/UserSection";
import Line from "@/components/navigation/Line";
import MenuSection from "@/components/navigation/MenuSection";
import {BottomDesktopMenuItems, MainMenuItems} from "@/components/navigation/MenuOptions";
import {useContext, useEffect, useRef} from "react";
import {NavigationContext} from "@/components/navigation/NavigationContext";
import "../../styles/navigation.css"

import clsx from "clsx";
import {animateSidebar} from "@/animations/Navigation";

export default function Sidebar() {
  const { isExpanded, setIsExpanded, isLocked } = useContext(NavigationContext);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    animateSidebar(sidebar, isExpanded);
  }, [isExpanded]);

  return (
      <div
          ref={sidebarRef}
          className="sidebar"
          onMouseEnter={() => {
            if (!isLocked) setIsExpanded(true)
          }}
          onMouseLeave={() => {
            if (!isLocked) setIsExpanded(false)
          }}
      >
        <UserSection />
        <Line />
        <div className={clsx(`sidebar-menu-section-base ${isExpanded ? "sidebar-menu-section-expanded" : ""}`)}>
          <MenuSection options={MainMenuItems} />
        </div>
        <div>
          <Line />
          <MenuSection options={BottomDesktopMenuItems} />
        </div>
      </div>
  );
}