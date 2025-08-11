"use client";

import { StudentViewProps } from "@/views/course/student/types";
import SectionView from "@/components/section-view/SectionView";
import { useScaleShow } from "@/animations/ScaleShow";
import { useEffect, useRef, useState } from "react";
import "./index.css";
import PointsSummary from "@/components/course/event-section/points-summary/PointsSummary";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import Loading from "@/components/loading/Loading";
import { useRouter } from "next/navigation";
import renderCard from "@/views/course/student/RenderCard";
import GradableEventRewardModal from "@/components/speed-dial/modals/GradableEventRewardModal";

export default function StudentView({
  eventSectionType,
  eventSectionId,
}: StudentViewProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const {
    data: gradableEvents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gradableEvents", eventSectionId],
    queryFn: () => EventSectionService.getStudentGradableEvents(eventSectionId),
  });

  const containerRef = useScaleShow(!isLoading);

  useEffect(() => {
    if (!isLoading && gradableEvents && gradableEvents.length === 1) {
      router.replace(
        `/course/${eventSectionType}/${eventSectionId}/${gradableEvents[0].id}`
      );
    }
  }, [isLoading, gradableEvents, eventSectionType, eventSectionId, router]);

  if (isLoading || (gradableEvents && gradableEvents.length < 2)) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading gradable events: {error.message}</div>;
  }

  if (!gradableEvents || gradableEvents.length === 0) {
    return <div>No gradable events.</div>;
  }

  const handleClick = (id: number, isLocked: boolean) => {
    if (isLocked) return;

    if (eventSectionType === "test") {
      setSelectedEventId(id);
    } else {
      router.replace(`/course/${eventSectionType}/${eventSectionId}/${id}`);
    }
  };

  return (
    <SectionView ref={containerRef}>
      <div className="flex flex-col gap-x-10 overflow-hidden lg:flex-row 2xl:px-10 bg-red-400">
        <div
          className="w-full min-h-full flex-col-centered bg-green-500"
          ref={wrapperRef}
        >
          <XPCardGrid
            containerRef={wrapperRef}
            gradableEvents={gradableEvents}
            renderCard={(event, mobile) =>
              renderCard(event, mobile, handleClick)
            }
          />
        </div>
        <PointsSummary ref={summaryRef} eventSectionId={eventSectionId} />
      </div>
      {eventSectionType === "test" && (
        <GradableEventRewardModal
          gradableEventId={selectedEventId ?? undefined}
          onClosed={() => setSelectedEventId(null)}
        />
      )}
    </SectionView>
  );
}
