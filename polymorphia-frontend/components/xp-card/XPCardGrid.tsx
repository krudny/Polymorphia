import XPCard from "./XPCard";
import "../pagination/index.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/Loading";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useXPGridAnimation } from "@/animations/XPGrid";
import "./index.css";
import { XPCardGridProps } from "@/components/xp-card/types";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import Pagination from "@/components/pagination/Pagination";
import PointsSummary from "@/components/course/event-section/points-summary/PointsSummary";
import { setResizeObserver } from "@/components/course/event-section/EventSectionUtils";
import EventGradeModal from "@/components/speed-dial/modals/EventGradeModal";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";

export default function XPCardGrid({
  eventSectionId,
  eventSectionType,
  containerRef,
}: XPCardGridProps) {
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

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const {
    data: gradableEvents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gradableEvents", eventSectionId],
    queryFn: () => EventSectionService.getGradableEvents(eventSectionId),
  });

  // if there's only one gradable event, there's fast forward to content omitting XPCardGrid.
  useEffect(() => {
    if (!isLoading && gradableEvents && gradableEvents.length === 1) {
      router.replace(
        `/course/${eventSectionType}/${eventSectionId}/${gradableEvents[0].id}`
      );
    }
  }, [isLoading, gradableEvents, eventSectionType, eventSectionId, router]);

  const { handlePageChange } = useXPGridAnimation(
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

  useEffect(() => {
    return setResizeObserver(
      containerRef,
      summaryRef,
      setMobile,
      setPageCols,
      setPageRows
    );
  }, [containerRef, summaryRef]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading gradable events: {error.message}</div>;
  }

  if (!gradableEvents || gradableEvents.length === 0) {
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
      setSelectedEventId(id);
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
      {gradableEventsPage.length > 1 ? (
        <div className="xp-card-grid-center-vertically">
          <div className="xp-card-grid-point-summary-layout">
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
                  // TODO: handle locked
                  <XPCard
                    title={gradableEvent.name}
                    subtitle={gradableEvent.topic ?? ""}
                    key={gradableEvent.id}
                    color={gradableEvent.gainedXp ? "green" : "silver"}
                    component={
                      // TODO: handle no grade, hasChest
                      <XPCardPoints
                        points={gradableEvent.gainedXp ?? "0.0"}
                        isSumLabelVisible={true}
                      />
                    }
                    size={mobile ? "sm" : "md"}
                    forceWidth={!mobile}
                    onClick={() => handleGradableEventClick(gradableEvent.id)}
                  />
                ))}
              </div>
            </div>
            {mobile && gradableEventsPage.length > 0 && pagination}
            <PointsSummary ref={summaryRef} eventSectionId={eventSectionId} />
          </div>
          {!mobile && pagination}
        </div>
      ) : (
        <div className="xp-card-no-grid">Brak aktywności.</div>
      )}

      {eventSectionType === "test" && (
        <EventGradeModal
          gradableEventId={selectedEventId ?? undefined}
          onClosed={() => setSelectedEventId(null)}
        />
      )}
    </>
  );
}
