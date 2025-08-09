"use client";

import { CardGridProps } from "@/components/xp-card/types";
import "./index.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import Loading from "@/components/loading/Loading";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import XPCard from "@/components/xp-card/XPCard";
import { getStudentCardComponent } from "@/shared/card/getCardComponent";
import Pagination from "@/components/pagination/Pagination";
import { useXPGridAnimation } from "@/animations/XPGrid";

export default function CardGrid({
  eventSectionId,
  eventSectionType,
}: CardGridProps) {
  const ITEMS_PER_PAGE = 3;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const [minGridHeight, setMinGridHeight] = useState<number>(0);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const mobile = false;

  useEffect(() => {
    console.log(minGridHeight);
  }, [minGridHeight]);

  const {
    data: gradableEvents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gradableEvents", eventSectionId],
    queryFn: () => EventSectionService.getStudentGradableEvents(eventSectionId),
  });

  useLayoutEffect(() => {
    if (!gradableEvents || gradableEvents.length === 0 || !sliderRef.current) {
      return;
    }

    if (currentPage === 0) {
      setTimeout(() => {
        if (sliderRef.current) {
          const height = sliderRef.current.scrollHeight;
          if (height > 0) {
            setMinGridHeight(
              Math.min(window.innerHeight - 150, Math.max(530, height))
            );
          }
        }
      }, 50);
    }
  }, [gradableEvents, currentPage, minGridHeight]);

  const { handlePageChange } = useXPGridAnimation(
    currentPage,
    sliderRef,
    setCurrentPage,
    gradableEvents,
    firstRender,
    setFirstRender
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading gradable events: {error.message}</div>;
  }

  if (!gradableEvents || gradableEvents.length === 0) {
    return <div>No gradable events.</div>;
  }

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = gradableEvents.slice(startIndex, endIndex);
  const pageCount = Math.ceil(gradableEvents.length / ITEMS_PER_PAGE);

  const handleGradableEventClick = (id: number) => {
    if (eventSectionType === "test") {
      setSelectedEventId(id);
    } else {
      router.push(`/course/${eventSectionType}/${eventSectionId}/${id}`);
    }
  };

  return (
    <div className="card-grid-wrapper">
      <div className="xp-card-fading-edges">
        <div
          className="card-grid"
          ref={sliderRef}
          style={{ minHeight: minGridHeight }}
        >
          {currentItems.map(({ id, name, topic, gainedXp, hasChest }) => (
            <XPCard
              title={name}
              subtitle={topic ?? ""}
              key={id}
              color={gainedXp !== 0 ? "green" : "silver"}
              component={getStudentCardComponent(gainedXp, hasChest)}
              size={mobile ? "sm" : "md"}
              forceWidth={false}
              onClick={() => handleGradableEventClick(id)}
            />
          ))}
        </div>
      </div>

      <div className="ml-3 mt-3">
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
        />
      </div>
    </div>
  );
}
