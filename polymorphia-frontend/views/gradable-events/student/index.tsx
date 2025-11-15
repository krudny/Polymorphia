"use client";

import SectionView from "@/components/section-view/SectionView";
import { useScaleShow } from "@/animations/ScaleShow";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import PointsSummary from "@/components/course/event-section/points-summary/PointsSummary";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import StudentGradableEventCard from "@/views/gradable-events/student/StudentGradableEventCard";
import { useEventParams } from "@/hooks/general/useEventParams";
import useStudentsGradableEvents from "@/hooks/course/useStudentsGradableEvents";
import { EventTypes } from "@/interfaces/general";
import usePointsSummary from "@/hooks/course/usePointsSummary";
import GradeModal from "@/components/speed-dial/modals/grade";
import ErrorComponent from "@/components/error";
import { GradableEventDTO } from "@/interfaces/api/gradable_event/types";
import { useMediaQuery } from "react-responsive";
import { Sizes } from "@/components/xp-card/types";

export default function StudentView() {
  const { eventType, eventSectionId } = useEventParams();
  const {
    data: gradableEvents,
    isLoading: areGradableEventsLoading,
    isError: areGradableEventsError,
  } = useStudentsGradableEvents();
  const {
    data: pointsSummary,
    isLoading: isPointsSummaryLoading,
    isError: isPointsSummaryError,
  } = usePointsSummary();
  const isLoading = areGradableEventsLoading || isPointsSummaryLoading;
  const isError = areGradableEventsError || isPointsSummaryError;
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useScaleShow(!isLoading);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const isMd = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (
      !areGradableEventsLoading &&
      gradableEvents &&
      gradableEvents.length === 1
    ) {
      router.push(
        `/course/${eventType.toLowerCase()}/${eventSectionId}/${gradableEvents[0].id}`
      );
    }
  }, [isLoading, gradableEvents, eventType, eventSectionId, router]);

  if (isLoading || (gradableEvents && gradableEvents.length < 2)) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent message="Nie udało się załadować wydarzeń." />;
  }

  if (!gradableEvents || gradableEvents.length === 0 || !pointsSummary) {
    return <div>No gradable events.</div>;
  }

  const handleClick = (gradableEvent: GradableEventDTO) => {
    if (gradableEvent.isLocked) {
      return;
    }

    if (eventType === EventTypes.TEST) {
      setSelectedEventId(gradableEvent.id);
    } else {
      router.push(
        `/course/${eventType.toLowerCase()}/${eventSectionId}/${gradableEvent.id}`
      );
    }
  };

  const cards = gradableEvents.map((gradableEvent) => (
    <StudentGradableEventCard
      key={gradableEvent.id}
      size={isMd ? Sizes.MD : Sizes.SM}
      gradableEvent={gradableEvent}
      isMobile={false}
      handleClick={handleClick}
    />
  ));

  return (
    <SectionView ref={containerRef}>
      <div className="student-view">
        <div className="student-view-cards" ref={wrapperRef}>
          <XPCardGrid containerRef={wrapperRef} cards={cards} maxColumns={2} />
        </div>
        <PointsSummary ref={summaryRef} pointsSummary={pointsSummary} />
      </div>
      {eventType === EventTypes.TEST && selectedEventId && (
        <GradeModal
          onClosedAction={() => setSelectedEventId(null)}
          gradableEventIdProp={selectedEventId}
        />
      )}
    </SectionView>
  );
}
