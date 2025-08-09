import { useScaleShow } from "@/animations/ScaleShow";
import XPCardGrid from "@/components/xp-card/XPCardGrid";
import SectionView from "@/components/section-view/SectionView";
import { InstructorViewProps } from "@/views/course/instructor-view/types";
import { useRef } from "react";

export default function InstructorView({
  eventSectionType,
  eventSectionId,
}: InstructorViewProps) {
  const containerRef = useScaleShow();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  console.log(eventSectionId, eventSectionType);
  return (
    <SectionView ref={containerRef}>
      <div className="flex flex-col lg:flex-col-centered flex-1 gap-x-10 overflow-hidden 2xl:px-10 bg-red-400">
        <div
          className="max-w-full flex-1 lg:flex-0 lg:min-h-[600px] lg:w-4xl 2xl:w-7xl bg-green-500"
          ref={wrapperRef}
        >
          <XPCardGrid
            eventSectionId={eventSectionId}
            eventSectionType={eventSectionType}
            containerRef={wrapperRef}
          />
        </div>
      </div>
    </SectionView>
  );
}
