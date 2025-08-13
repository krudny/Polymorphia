import { useScaleShow } from "@/animations/ScaleShow";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import { InstructorViewProps } from "@/views/course/instructor/types";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import renderCard from "@/views/course/instructor/RenderCard";

export default function InstructorView({
  eventSectionType,
  eventSectionId,
}: InstructorViewProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const {
    data: gradableEvents,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gradableEvents", eventSectionId],
    queryFn: () =>
      EventSectionService.getInstructorGradableEvents(eventSectionId),
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

  const handleClick = (id: number) => {
    if (eventSectionType === "test" || eventSectionType === "assignment") {
      router.replace(`/course/${eventSectionType}/${eventSectionId}/${id}/grading`);
    } else {
      router.replace(`/course/${eventSectionType}/${eventSectionId}/${id}/pick-group`);
    }
  };

  return (
    <SectionView ref={containerRef}>
      <div className="flex flex-col lg:flex-col-centered flex-1 gap-x-10 overflow-hidden 2xl:px-10 bg-red-400">
        <div
          className="max-w-full flex-1 lg:flex-0 lg:min-h-[600px] lg:w-4xl 2xl:w-7xl bg-green-500"
          ref={wrapperRef}
        >
          <XPCardGrid
            containerRef={wrapperRef}
            gradableEvents={gradableEvents}
            renderCard={(event, mobile) => renderCard(event, mobile, handleClick)}
          />
        </div>
      </div>
    </SectionView>
  );
}
