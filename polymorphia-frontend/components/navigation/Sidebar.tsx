'use client';
import UserSection from '@/components/navigation/UserSection';
import Line from '@/components/navigation/Line';
import MenuSection from '@/components/navigation/MenuSection';
import {
  BottomDesktopMenuItems,
  MainMenuItems,
} from '@/components/navigation/MenuOptions';
import { useContext, useEffect, useRef } from 'react';
import { NavigationContext } from '@/components/navigation/NavigationContext';
import '../../styles/navigation.css';

import clsx from 'clsx';
import { animateSidebar } from '@/animations/Navigation';
import { useQuery } from '@tanstack/react-query';
import { EventSectionService } from '@/services/course/event-section/EventSectionService';
import { updateMenuItems } from '@/services/course/event-section/EventSectionUtils';

export default function Sidebar() {
  const { isSidebarExpanded, setIsSidebarExpanded, isSidebarLocked } =
    useContext(NavigationContext);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    animateSidebar(sidebar, isSidebarExpanded);
  }, [isSidebarExpanded]);

  const { data: eventSections, isSuccess } = useQuery({
    queryKey: ['eventSections'],
    // TODO: use real courseId
    queryFn: () => EventSectionService.getEventSections(1),
  });

  const menuItems = [...MainMenuItems];
  if (isSuccess) {
    updateMenuItems(menuItems, eventSections);
  }

  return (
    <div
      ref={sidebarRef}
      id={isSidebarLocked ? 'sidebar-locked' : 'sidebar-animated'}
      className="sidebar"
      onMouseEnter={() => {
        if (!isSidebarLocked) setIsSidebarExpanded(true);
      }}
      onMouseLeave={() => {
        if (!isSidebarLocked) setIsSidebarExpanded(false);
      }}
    >
      <UserSection />
      <Line />
      <div
        className={clsx(
          `sidebar-menu-section-base ${
            isSidebarExpanded ? 'sidebar-menu-section-expanded' : ''
          }`
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
