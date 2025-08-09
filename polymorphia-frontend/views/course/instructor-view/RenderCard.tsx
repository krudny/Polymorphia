import { InstructorGradableEventResponseDTO } from "@/app/(logged-in)/course/EventSectionService";
import XPCard from "@/components/xp-card/XPCard";
import XPCardUngraded from "@/components/xp-card/inner-components/XPCardUngraded";

export default function renderCard(
  gradableEvent: InstructorGradableEventResponseDTO,
  isMobile: boolean
  // handleGradableEventClick: (id: number, isLocked: boolean) => void
) {
  return (
    <XPCard
      title={gradableEvent.name}
      subtitle={gradableEvent.topic ?? ""}
      color={gradableEvent.ungraded === 0 ? "green" : "silver"}
      component={<XPCardUngraded ungraded={gradableEvent.ungraded} />}
      size={isMobile ? "sm" : "md"}
      forceWidth={!isMobile}
      // onClick={() => handleGradableEventClick(event.id, event.isLocked)}
    />
  );
}
