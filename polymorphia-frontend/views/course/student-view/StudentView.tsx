"use client";

import { StudentViewProps } from "@/views/course/student-view/types";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import { useScaleShow } from "@/animations/ScaleShow";
import { useRef } from "react";
import "./index.css";

// TODO: section-view nie ma styli ani id
export default function StudentView({
  eventSectionType,
  eventSectionId,
}: StudentViewProps) {
  const containerRef = useScaleShow();
  const summaryRef = useRef<HTMLDivElement | null>(null);

  return (
    <SectionView ref={containerRef}>
      <XPCardGrid
        eventSectionId={eventSectionId}
        eventSectionType={eventSectionType}
        containerRef={containerRef}
      />
      {/*<PointsSummary ref={summaryRef} eventSectionId={eventSectionId} />*/}
    </SectionView>
  );
}
