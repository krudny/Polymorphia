import GradeModal from "@/components/speed-dial/modals/grade";
import { RoadmapModalsProps } from "@/app/(logged-in)/roadmap/types";

export default function RoadmapModals({
  selectedGradableEvent,
  setSelectedGradableEvent,
}: RoadmapModalsProps) {
  if (!selectedGradableEvent) {
    return null;
  }

  return (
    <GradeModal
      gradableEventIdProp={selectedGradableEvent.id}
      onClosedAction={() => setSelectedGradableEvent(undefined)}
    />
  );
}
