import XPCard from "./XPCard";
import "../pagination/index.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/Loading";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { setResizeObserver } from "@/components/course/event-section/EventSectionUtils";
import { useEventSectionAnimation } from "@/animations/EventSection";
import "./index.css";
import { EventSectionCardGridProps } from "@/components/xp-card/types";
import { BetterEventSectionService } from "@/app/(logged-in)/course/[eventSectionType]/BetterEventSectionService";
import Pagination from "@/components/pagination/Pagination";
import TestDetailsModal from "@/components/course/event-section/TestDetailsModal";
import PointsSummary from "@/components/course/event-section/points-summary/PointsSummary";

export default function XPCardGrid({
  eventSectionId,
  eventSectionType,
  containerRef,
}: EventSectionCardGridProps) {
  const router = useRouter();

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageRows, setPageRows] = useState(3);
  const [pageCols, setPageCols] = useState(2);
  const [mobile, setMobile] = useState(false);
  const [pageToShow, setPageToShow] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [firstRender, setFirstRender] = useState(true);

  const [selectedGradableEventId, setSelectedGradableEventId] = useState<
    number | null
  >(null);

  const {
    data: gradableEvents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gradableEvents", eventSectionId],
    queryFn: () => BetterEventSectionService.getGradableEvents(eventSectionId),
  });

  useEffect(() => {
    return setResizeObserver(
      containerRef,
      summaryRef,
      setMobile,
      setPageCols,
      setPageRows
    );
  }, [containerRef, summaryRef]);

  const { handlePageChange } = useEventSectionAnimation(
    pageToShow,
    setDirection,
    sliderRef,
    setPageToShow,
    setCurrentPage,
    gradableEvents,
    direction,
    firstRender,
    setFirstRender
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading gradable events: {error.message}</div>;
  }

  if (!gradableEvents) {
    return <div>No gradable events.</div>;
  }

  const pageSize = pageRows * pageCols;
  const pageCount = Math.ceil(gradableEvents.length / pageSize);
  const gradableEventsPage = gradableEvents.slice(
    pageToShow * pageSize,
    pageToShow * pageSize + pageSize
  );

  const handleGradableEventClick = (id: number) => {
    if (eventSectionType === "test") {
      setSelectedGradableEventId(id);
    } else {
      router.push(`/course/${eventSectionType}/${eventSectionId}/${id}`);
    }
  };

  const pagination = (
    <Pagination
      pageCount={pageCount}
      onPageChange={handlePageChange}
      forcePage={pageCount > 0 ? currentPage : undefined}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
    />
  );

  return (
    <>
      <div className="xp-card-grid-center-vertically">
        <div className="xp-card-grid-point-summary-layout">
          {gradableEventsPage.length > 0 ? (
            <div className="xp-card-fading-edges">
              <div
                ref={sliderRef}
                className={clsx(
                  "xp-card-grid",
                  `grid-cols-${pageCols}`,
                  `grid-rows-${pageRows}`
                )}
              >
                {gradableEventsPage.map((gradableEvent) => (
                  <XPCard
                    title={gradableEvent.name}
                    subtitle={gradableEvent.topic ?? ""}
                    key={gradableEvent.id}
                    color={gradableEvent.gainedXp !== 0 ? "green" : "silver"}
                    xp={gradableEvent.gainedXp.toFixed(1).toString()}
                    size={mobile ? "sm" : "md"}
                    forceWidth={!mobile}
                    onClick={() => handleGradableEventClick(gradableEvent.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="xp-card-no-grid">Brak aktywności.</div>
          )}
          {mobile && gradableEventsPage.length > 0 && pagination}
          <PointsSummary ref={summaryRef} eventSectionId={eventSectionId} />
        </div>
        {!mobile && pagination}
      </div>
      {eventSectionType === "test" && (
        <TestDetailsModal
          eventSectionId={eventSectionId}
          selectedGradableEventId={selectedGradableEventId}
          onClosed={() => setSelectedGradableEventId(null)}
        />
      )}
    </>
  );
}
