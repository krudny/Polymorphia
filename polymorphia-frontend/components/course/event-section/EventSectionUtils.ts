"use client";

import { MenuOption } from "@/components/navigation/types";
import { EventSectionResponseDTO } from "@/interfaces/api/course";
import { RefObject } from "react";
import { useMenuCourseOptionText } from "@/hooks/general/useMenuCourseOptionText";
import { Role } from "@/interfaces/api/user";

export function updateMenuItems(
  menuItems: MenuOption[],
  eventSections: EventSectionResponseDTO[],
  userRole: Role
) {
  const courseItem = menuItems.filter(
    (menuOption) => menuOption.text === useMenuCourseOptionText(userRole)
  )[0];

  courseItem.link = `course/${eventSections[0].type.toLowerCase()}/${eventSections[0].id}`;

  courseItem.subItems = eventSections.map((eventSection) => {
    // TODO: use correct courseID
    return {
      text: eventSection.name,
      link: `course/${eventSection.type.toLowerCase()}/${eventSection.id}`,
    };
  });
}

export function setResizeObserver(
  containerRef: RefObject<HTMLDivElement | null>,
  setMobile: (isMobile: boolean) => void,
  setPageCols: (cols: number) => void,
  setPageRows: (rows: number) => void,
  maxColumns: number,
  maxRows: number
) {
  if (!containerRef.current) {
    return;
  }

  const handleResize = () => {
    if (!containerRef.current) {
      return;
    }

    const height = containerRef.current.offsetHeight;
    const width = containerRef.current.offsetWidth;

    if (window.outerWidth < 1024) {
      setMobile(true);

      setPageCols(width > 650 ? 2 : 1);

      const gridCardsGap = 20;
      const cardHeight = 125;

      const rows = Math.floor(
        (height + gridCardsGap) / (cardHeight + gridCardsGap)
      );

      setPageRows(Math.min(rows, maxRows));
    } else {
      setMobile(false);

      const gridCardsGap = 20;
      const minCardWidth = 350;
      const cardHeight = 160;

      const rows = Math.floor(
        (height + gridCardsGap) / (cardHeight + gridCardsGap)
      );
      const cols = Math.floor(
        (width + gridCardsGap) / (minCardWidth + gridCardsGap)
      );

      const maxRows = height <= 550 ? 2 : height >= 900 ? 4 : 3;
      const minCols = window.innerWidth >= 1280 ? 2 : 1;

      setPageRows(Math.max(Math.min(rows, maxRows), 1));
      setPageCols(Math.max(Math.min(cols, maxColumns), minCols));
    }
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(containerRef.current);

  handleResize();

  return () => {
    resizeObserver.disconnect();
  };
}
