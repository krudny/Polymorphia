"use client";

import { StudentViewProps } from "@/views/course/student-view/types";
import SectionView from "@/components/section-view/SectionView";
import { useScaleShow } from "@/animations/ScaleShow";
import { useRef } from "react";
import "./index.css";
import PointsSummary from "@/components/course/event-section/points-summary/PointsSummary";
import XPCardGrid from "@/components/xp-card/XPCardGrid";

// TODO: section-view nie ma styli ani id
export default function StudentView({
  eventSectionType,
  eventSectionId,
}: StudentViewProps) {
  const containerRef = useScaleShow();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  return (
    <SectionView ref={containerRef}>
      <div className="flex overflow-hidden bg-red-400">
        <div
          className="w-full min-h-full flex-col-centered bg-green-500"
          ref={wrapperRef}
        >
          <XPCardGrid
            eventSectionId={eventSectionId}
            eventSectionType={eventSectionType}
            containerRef={wrapperRef}
          />
        </div>
        <PointsSummary ref={summaryRef} eventSectionId={eventSectionId} />
      </div>
    </SectionView>
  );
}
