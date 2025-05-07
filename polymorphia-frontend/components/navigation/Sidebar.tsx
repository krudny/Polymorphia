"use client"
import UserSection from "@/components/navigation/UserSection";
import Line from "@/components/navigation/Line";
import MenuSection from "@/components/navigation/MenuSection";
import {BottomDesktopMenuItems, MainMenuItems} from "@/components/navigation/MenuOptions";
import {useContext, useEffect, useRef} from "react";
import {NavigationContext} from "@/components/navigation/NavigationContext";

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
          className="flex flex-col max-h-screen min-h-full bg-neutral-800 w-[96px] overflow-visible"
          onMouseEnter={() => {
            if (!isLocked) setIsExpanded(true)
          }}
          onMouseLeave={() => {
            if (!isLocked) setIsExpanded(false)
          }}
      >
        <UserSection />
        <Line />
        <div className={clsx(`flex-1 my-2 overflow-hidden ${isExpanded ? "overflow-y-scroll custom-scrollbar lg:mr-2" : ""}`)}>
          <MenuSection options={MainMenuItems} />
        </div>
        <div>
          <Line />
          <MenuSection options={BottomDesktopMenuItems} />
        </div>
      </div>
  );
}