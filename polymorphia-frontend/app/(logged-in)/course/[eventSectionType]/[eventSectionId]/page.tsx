"use client";

import { useParams } from "next/navigation";
import { useScaleShow } from "@/animations/ScaleShow";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import { EventSectionType } from "@/components/course/event-section/types";

export default function SectionView() {
  const params = useParams();
  const eventSectionType = params.eventSectionType as EventSectionType;
  const eventSectionId = Number(params.eventSectionId);
  const containerRef = useScaleShow();

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
