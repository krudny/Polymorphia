import { useScaleShow } from "@/animations/ScaleShow";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import renderCard from "@/views/course/instructor/RenderCard";
import { useEventParams } from "@/hooks/general/useEventParams";
import useInstructorGradableEvents from "@/hooks/course/useInstructorGradableEvents";
import "./index.css";

export default function InstructorView() {
  const { eventType, eventSectionId } = useEventParams();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const {
    data: gradableEvents,
    isLoading,
    isError,
  } = useInstructorGradableEvents();

  const containerRef = useScaleShow(!isLoading);

  useEffect(() => {
    if (!isLoading && gradableEvents && gradableEvents.length === 1) {
      router.replace(
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

  const handleClick = (id: number) => {
    router.push(
      `/course/${eventType.toLowerCase()}/${eventSectionId}/${id}/grading`
    );
  };

  const cards = gradableEvents.map((gradableEvent) =>
    renderCard(gradableEvent, false, handleClick)
  );

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
