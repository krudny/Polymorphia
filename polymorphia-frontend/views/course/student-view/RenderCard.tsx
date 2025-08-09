import { StudentGradableEventResponseDTO } from "@/app/(logged-in)/course/EventSectionService";
import XPCard from "@/components/xp-card/XPCard";
import { getStudentCardComponent } from "@/shared/card/getCardComponent";

export default function renderCard(
  gradableEvent: StudentGradableEventResponseDTO,
  isMobile: boolean,
  handleGradableEventClick: (id: number, isLocked: boolean) => void
) {
  return (
    <XPCard
      title={gradableEvent.name}
      subtitle={gradableEvent.topic ?? ""}
      color={gradableEvent.gainedXp !== 0 ? "green" : "silver"}
      component={getStudentCardComponent(
        gradableEvent.gainedXp,
        gradableEvent.hasChest
      )}
      size={isMobile ? "sm" : "md"}
      forceWidth={!isMobile}
      isLocked={gradableEvent.isLocked}
      onClick={() =>
        handleGradableEventClick(gradableEvent.id, gradableEvent.isLocked)
      }
    />
  );
}
