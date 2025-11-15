import { useScaleShow } from "@/animations/ScaleShow";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import InstructorGradableEventCard from "@/views/gradable-events/instructor/InstructorGradableEventCard";
import { useEventParams } from "@/hooks/general/useEventParams";
import useInstructorGradableEvents from "@/hooks/course/useInstructorGradableEvents";
import "./index.css";
import ErrorComponent from "@/components/error";
import { Sizes } from "@/interfaces/general";
import { useMediaQuery } from "react-responsive";
import { GradableEventDTO } from "@/interfaces/api/gradable_event/types";

export default function InstructorView() {
  const { eventType, eventSectionId } = useEventParams();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const {
    data: gradableEvents,
    isLoading,
    isError,
  } = useInstructorGradableEvents();
  const isMd = useMediaQuery({ minWidth: 768 });

  const containerRef = useScaleShow(!isLoading);

  useEffect(() => {
    if (!isLoading && gradableEvents && gradableEvents.length === 1) {
      router.replace(
        `/course/${eventType.toLowerCase()}/${eventSectionId}/${gradableEvents[0].id}/grading`
      );
    }
  }, [isLoading, gradableEvents, eventType, eventSectionId, router]);

  if (isLoading || (gradableEvents && gradableEvents.length < 2)) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent message="Nie udało się załadować wydarzeń." />;
  }

  if (!gradableEvents || gradableEvents.length === 0) {
    return <div>No gradable events.</div>;
  }

  const handleClick = (gradableEvent: GradableEventDTO) => {
    router.push(
      `/course/${eventType.toLowerCase()}/${eventSectionId}/${gradableEvent.id}/grading`
    );
  };

  const cards = gradableEvents.map((gradableEvent) => (
    <InstructorGradableEventCard
      key={gradableEvent.id}
      size={isMd ? Sizes.MD : Sizes.SM}
      gradableEvent={gradableEvent}
      isMobile={false}
      handleClick={handleClick}
    />
  ));

  return (
    <SectionView ref={containerRef}>
      <div className="instructor-view">
        <div className="instructor-view-cards" ref={wrapperRef}>
          <XPCardGrid containerRef={wrapperRef} cards={cards} />
        </div>
      </div>
    </SectionView>
  );
}
