"use client";

import { useParams } from "next/navigation";
import { useScaleShow } from "@/animations/ScaleShow";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import { EventType } from "@/interfaces/api/DTO";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "../../EventSectionService";

export default function SectionView() {
  const params = useParams();
  const eventSectionType = params.eventSectionType as EventType;
  const eventSectionId = Number(params.eventSectionId);

  const containerRef = useScaleShow();

  const { setTitle } = useTitle();

  const { data: eventSection } = useQuery({
    queryKey: ["eventSections", eventSectionId],
    queryFn: () => EventSectionService.getEventSection(eventSectionId),
  });

  useEffect(() => {
    setTitle(eventSection?.name ?? "");
  }, [eventSection, setTitle]);

  return (
    <div
      ref={containerRef}
      id="section-view-containter"
      className="section-view"
    >
      <XPCardGrid
        eventSectionId={eventSectionId}
        eventSectionType={eventSectionType}
        containerRef={containerRef}
      />
    </div>
  );
}
