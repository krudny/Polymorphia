"use client";

import { useScaleShow } from "@/animations/ScaleShow";
import { useEffect, useState } from "react";
import "./index.css";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { useEventParams } from "@/hooks/general/useEventParams";
import useStudentsGradableEvents from "@/hooks/course/useStudentsGradableEvents";
import { EventTypes } from "@/interfaces/general";
import usePointsSummary from "@/hooks/course/usePointsSummary";
import ErrorComponent from "@/components/error";
import { GradableEventDTO } from "@/interfaces/api/gradable_event/types";
import NewCardGridView from "@/components/new-card/grid";

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
  const containerRef = useScaleShow(!isLoading);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    if (
      !areGradableEventsLoading &&
      gradableEvents &&
      gradableEvents.length === 1 &&
      eventType !== EventTypes.TEST
    ) {
      router.push(
        `/course/${eventType.toLowerCase()}/${eventSectionId}/${gradableEvents[0].id}`
      );
    }
  }, [
    isLoading,
    gradableEvents,
    eventType,
    eventSectionId,
    router,
    areGradableEventsLoading,
  ]);

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

  return (
    <NewCardGridView
      ref={containerRef}
      cardConfigurations={gradableEvents.map((gradableEvent) => ({
        title: gradableEvent.name,
        subtitle: gradableEvent.topic,
        rightComponent: () => (
          <div className="flex-centered">{gradableEvent.gainedXp}</div>
        ),
        color: gradableEvent.gainedXp != undefined ? "green" : "sky",
        onClick: () => handleClick(gradableEvent),
      }))}
      usesPointsSummary={true}
      pointsSummaryConfiguration={pointsSummary}
    />
    //     {eventType === EventTypes.TEST && selectedEventId && (
    //       <GradeModal
    //         onClosedAction={() => setSelectedEventId(null)}
    //         gradableEventIdProp={selectedEventId}
    //       />
    //     )}
  );
}
