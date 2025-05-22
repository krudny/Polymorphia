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
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/course/EventSectionService";

export default function Sidebar() {
  const { isSidebarExpanded, setIsSidebarExpanded, isSidebarLocked } = useContext(NavigationContext);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    animateSidebar(sidebar, isSidebarExpanded);
  }, [isSidebarExpanded]);

  const {
    data: eventSections,
    isSuccess,
  } = useQuery({
    queryKey: ['eventSections'],
    queryFn: () => EventSectionService.getEventSections(),
  });

  let menuItems = [...MainMenuItems];
  if (isSuccess) {
    const courseItem = menuItems.filter(
      (menuOption) => menuOption.text === 'Kurs'
    )[0];
    courseItem.link = `course/1/${eventSections[0].id}`;

    courseItem.subItems = eventSections.map((eventSection) => {
      // TODO: use correct courseID
      return {
        text: eventSection.name,
        link: `course/${eventSection.id}`,
      };
    });
  }

  return (
      <div
          ref={sidebarRef}
          className="sidebar"
          onMouseEnter={() => {
            if (!isSidebarLocked) setIsSidebarExpanded(true)
          }}
          onMouseLeave={() => {
            if (!isSidebarLocked) setIsSidebarExpanded(false)
          }}
      >
        <UserSection />
        <Line />
        <div className={clsx(`sidebar-menu-section-base ${isSidebarExpanded ? "sidebar-menu-section-expanded" : ""}`)}>
          <MenuSection options={menuItems} />
        </div>
        <div>
          <Line />
          <MenuSection options={BottomDesktopMenuItems} />
        </div>
      </div>
  );
}