"use client";

import { StudentViewProps } from "@/views/course/student-view/types";
import SectionView from "@/components/section-view/SectionView";
import { useScaleShow } from "@/animations/ScaleShow";
import { useEffect, useRef } from "react";
import "./index.css";
import CardGrid from "@/components/xp-card/CardGrid";
import PointsSummary from "@/components/course/event-section/points-summary/PointsSummary";

// TODO: section-view nie ma styli ani id
export default function StudentView({
  eventSectionType,
  eventSectionId,
}: StudentViewProps) {
  const containerRef = useScaleShow();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("wrapper", wrapperRef.current?.offsetHeight);
  }, [wrapperRef]);

  return (
    <SectionView ref={containerRef}>
      <div className=" flex bg-yellow-500 overflow-hidden" ref={wrapperRef}>
        <CardGrid
          eventSectionId={eventSectionId}
          eventSectionType={eventSectionType}
          containerRef={wrapperRef}
        />
        <PointsSummary ref={summaryRef} eventSectionId={eventSectionId} />
      </div>
    </SectionView>
  );
}
