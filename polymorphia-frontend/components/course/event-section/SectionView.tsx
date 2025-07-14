import XPCardGrid from "@/components/xp-card/XPCardGrid";
import { SectionViewProps } from "@/components/course/event-section/types";
import { useScaleShow } from "@/animations/General";
import "./index.css";

export default function SectionView({
  eventSectionId,
  eventSectionType,
}: SectionViewProps) {
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
