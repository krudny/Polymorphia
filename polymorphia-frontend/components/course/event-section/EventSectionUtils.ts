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

      const gridCardsGap = 20;
      const cardHeight = 125;

      const rows = Math.floor(
        (height + gridCardsGap) / (cardHeight + gridCardsGap)
      );

      setPageRows(rows);
    } else {
      setMobile(false);

      const gridCardsGap = 20;
      const minCardWidth = 330;
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
      setPageCols(Math.max(Math.min(cols, 3), minCols));
    }
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(containerRef.current);

  handleResize();

  return () => {
    resizeObserver.disconnect();
  };
}
