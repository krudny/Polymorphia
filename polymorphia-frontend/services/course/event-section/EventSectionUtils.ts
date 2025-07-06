"use client";

import {
  BonusInfo,
  EventSection,
  EventSectionShortResponseDto,
  GradableEventCoreResponse,
} from "@/interfaces/course/event-section/EventSectionInterfaces";
import { PointsSummaryElementProps } from "@/interfaces/course/event-section/PointsSummaryInterfaces";
import { MenuOption } from "@/components/navigation/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { EventSectionCardProps } from "@/components/xp-card/types";

export function updateMenuItems(
  menuItems: MenuOption[],
  eventSections: EventSectionShortResponseDto[]
) {
  const courseItem = menuItems.filter(
    (menuOption) => menuOption.text === "Kurs"
  )[0];
  courseItem.link = `course/${eventSections[0].eventSectionType}/${eventSections[0].id}`;

  courseItem.subItems = eventSections
    .filter((eventSection) => !eventSection.hidden)
    .map((eventSection) => {
      // TODO: use correct courseID
      return {
        text: eventSection.name,
        link: `course/${eventSection.eventSectionType}/${eventSection.id}`,
      };
    });
}

export function setResizeObserver(
  containerRef: React.RefObject<HTMLDivElement | null>,
  summaryRef: React.RefObject<HTMLDivElement | null>,
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
      const gridPointsSummaryGap = 40;
      const cardWidth = 416;
      const cardHeight = 160;
      const summaryApproxOffset = 300;
      const heightApproxOffset = 80;
      const widthApproxOffset = 100;

      const rows = Math.floor(
        (height - heightApproxOffset + gridCardsGap) /
          (cardHeight + gridCardsGap)
      );
      const cols = Math.floor(
        (width -
          gridPointsSummaryGap -
          widthApproxOffset -
          (summaryRef?.current?.offsetWidth ?? summaryApproxOffset) +
          sidebarOffset +
          gridCardsGap) /
          (cardWidth + gridCardsGap)
      );

      const maxRows = height <= 650 ? 2 : height >= 900 ? 4 : 3;

      setPageRows(Math.max(Math.min(rows, maxRows), 1));
      setPageCols(Math.max(Math.min(cols, 3), 1));
    }
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(containerRef.current);
  if (summaryRef.current !== null) {
    resizeObserver.observe(summaryRef.current);
  }

  handleResize();

  return () => {
    resizeObserver.disconnect();
  };
}

export function mapPropsToCards(
  gradableEventsData: GradableEventCoreResponse,
  setCurrentlySelectedGradableEventIdForModal: (e: number | null) => void,
  router: AppRouterInstance,
  eventSection: EventSection
): (EventSectionCardProps & { id: number })[] {
  return gradableEventsData.data
    .filter((event) => !event.hidden)
    .map((event) => {
      return {
        id: event.id,
        title: event.name,
        subtitle: event.topic,
        xp: event.gainedXp ? `${event.gainedXp} xp` : undefined,
        onClick:
          eventSection.type === "test"
            ? () => {
                setCurrentlySelectedGradableEventIdForModal(event.id);
              }
            : () => {
                router.push(
                  `/course/${eventSection.type}/${eventSection.id}/${event.id}`
                );
              },
      };
    });
}

export function getBonusesFromEventSection(
  eventSection: EventSection,
  setCurrentBonusInfoModal: (e: BonusInfo) => void
): PointsSummaryElementProps[] {
  return [
    {
      bonus: {
        name: "Zdobyte xp",
        bonusXp: `${eventSection.gainedXp} xp`,
        items: [],
      },
    },
    ...eventSection.bonuses.map((bonus) => {
      return {
        bonus: {
          ...bonus,
          bonusXp: `${bonus.bonusXp} xp`,
          bonusPercentage: bonus.bonusPercentage
            ? `+${bonus.bonusPercentage}$`
            : undefined,
        },
        onClick: () => setCurrentBonusInfoModal(bonus),
      };
    }),
    {
      bonus: {
        name: "Łącznie",
        bonusXp: `${eventSection.totalXp} xp`,
        items: [],
      },
      horizontal: true,
    },
  ];
}
