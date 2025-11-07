"use client";

import SectionView from "@/components/section-view/SectionView";
import { useScaleShow } from "@/animations/ScaleShow";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import PointsSummary from "@/components/course/event-section/points-summary/PointsSummary";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import GradableEventCard from "@/views/course/student/GradableEventCard";
import { useEventParams } from "@/hooks/general/useEventParams";
import GradeModal from "@/components/speed-dial/modals/grade";
import useStudentsGradableEvents from "@/hooks/course/useStudentsGradableEvents";
import { EventTypes } from "@/interfaces/general";

export default function StudentView() {
  const { eventType, eventSectionId } = useEventParams();
  const {
    data: gradableEvents,
    isLoading,
    isError,
  } = useStudentsGradableEvents();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useScaleShow(!isLoading);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && gradableEvents && gradableEvents.length === 1) {
      router.push(
        `/course/${eventType.toLowerCase()}/${eventSectionId}/${gradableEvents[0].id}`
      );
    }
  }, [isLoading, gradableEvents, eventType, eventSectionId, router]);

  if (isLoading || (gradableEvents && gradableEvents.length < 2)) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading gradable events</div>;
  }

  if (!gradableEvents || gradableEvents.length === 0) {
    return <div>No gradable events.</div>;
  }

  const handleClick = (id: number, isLocked: boolean) => {
    if (isLocked) {
      return;
    }

    if (eventType === EventTypes.TEST) {
      setSelectedEventId(id);
    } else {
      router.push(`/course/${eventType.toLowerCase()}/${eventSectionId}/${id}`);
    }
  };

  const cards = gradableEvents.map((gradableEvent) => (
    <GradableEventCard
      key={gradableEvent.id}
      gradableEvent={gradableEvent}
      isMobile={false}
      handleGradableEventClick={handleClick}
    />
  ));

  return (
    <SectionView ref={containerRef}>
      <div className="student-view">
        <div className="student-view-cards" ref={wrapperRef}>
          <XPCardGrid containerRef={wrapperRef} cards={cards} maxColumns={2} />
        </div>
        <PointsSummary ref={summaryRef} />
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
