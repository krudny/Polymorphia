"use client";

import { EventSectionResponseDTO } from "@/components/course/event-section/types";
import { MenuOption } from "@/components/navigation/types";
import { RefObject } from "react";

export function updateMenuItems(
  menuItems: MenuOption[],
  eventSections: EventSectionResponseDTO[]
) {
  const courseItem = menuItems.filter(
    (menuOption) => menuOption.text === "Kurs"
  )[0];

  courseItem.link = `course/${eventSections[0].type}/${eventSections[0].id}`;

  courseItem.subItems = eventSections
    .filter((eventSection) => !eventSection.hidden)
    .map((eventSection) => {
      // TODO: use correct courseID
      return {
        text: eventSection.name,
        link: `course/${eventSection.type}/${eventSection.id}`,
      };
    });
}

export function setResizeObserver(
  containerRef: RefObject<HTMLDivElement | null>,
  setMobile: (v: boolean) => void,
  setPageCols: (n: number) => void,
  setPageRows: (n: number) => void
) {
  if (!containerRef.current) return;

  const handleResize = () => {
    if (!containerRef.current) return;

    const height = containerRef.current.offsetHeight;
    const width = containerRef.current.offsetWidth;

    if (window.outerWidth < 1024) {
      setMobile(true);

      setPageCols(width > 650 ? 2 : 1);
      setPageRows(5);
    } else {
      setMobile(false);

      const expandedSidebar = document.getElementById("sidebar-animated");
      const sidebarOffset =
        expandedSidebar !== null ? expandedSidebar.offsetWidth : 0;

      const gridCardsGap = 20;
      const cardWidth = 416;
      const cardHeight = 160;
      const heightApproxOffset = 80;
      const widthApproxOffset = 100;

      const rows = Math.floor(
        (height - heightApproxOffset + gridCardsGap) /
          (cardHeight + gridCardsGap)
      );
      const cols = Math.floor(
        (width - widthApproxOffset - sidebarOffset + gridCardsGap) /
          (cardWidth + gridCardsGap)
      );

      const maxRows = height <= 650 ? 2 : height >= 900 ? 4 : 3;

      setPageRows(Math.max(Math.min(rows, maxRows), 1));
      setPageCols(Math.max(Math.min(cols, 3), 1));
    }
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(containerRef.current);

  handleResize();

  return () => {
    resizeObserver.disconnect();
  };
}
