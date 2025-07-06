import XPCardGrid from "@/components/xp-card/XPCardGrid";
import { SectionViewProps } from "@/interfaces/course/event-section/EventSectionInterfaces";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/course/event-section/EventSectionService";
import Loading from "@/components/general/Loading";
import { useTitle } from "@/components/navigation/TitleContext";
import { useScaleShow } from "@/animations/General";
import "./index.css";

export default function SectionView({
  eventSectionId,
  eventSectionType,
}: SectionViewProps) {
  const { setTitle } = useTitle();
  const containerRef = useScaleShow();

  const {
    data: eventSection,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["eventSections", eventSectionId],
    queryFn: () =>
      EventSectionService.getEventSection({ eventSectionId, eventSectionType }),
  });

  useEffect(() => {
    setTitle(isSuccess ? eventSection.name : "");
  }, [eventSection, isSuccess, setTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="section-view">
        Error loading event section: {error.message}
      </div>
    );
  }

  if (!eventSection) {
    return (
      <div className="section-view">No event section with this ID exists.</div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="section-view-containter"
      className="section-view"
    >
      <XPCardGrid eventSection={eventSection} containerRef={containerRef} />
    </div>
  );
}
