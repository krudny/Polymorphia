import { StudentGradableEventResponseDTO } from "@/app/(logged-in)/course/EventSectionService";
import XPCard from "@/components/xp-card/XPCard";
import { getCardComponent } from "@/shared/card/getCardComponent";

export default function renderCard(
  event: StudentGradableEventResponseDTO,
  mobile: boolean,
  handleGradableEventClick: (id: number, isLocked: boolean) => void
) {
  return (
    <XPCard
      title={event.name}
      subtitle={event.topic ?? ""}
      color={event.gainedXp !== 0 ? "green" : "silver"}
      component={getCardComponent(event.gainedXp, event.hasChest)}
      size={mobile ? "sm" : "md"}
      forceWidth={!mobile}
      isLocked={event.isLocked}
      onClick={() => handleGradableEventClick(event.id, event.isLocked)}
    />
  );
}
