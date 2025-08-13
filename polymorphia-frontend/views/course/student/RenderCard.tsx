import { StudentGradableEventResponseDTO } from "@/app/(logged-in)/course/EventSectionService";
import XPCard from "@/components/xp-card/XPCard";
import { getStudentCardComponent } from "@/shared/card/getCardComponent";
import { ReactNode } from "react";

export default function renderCard(
  gradableEvent: StudentGradableEventResponseDTO,
  isMobile: boolean,
  handleGradableEventClick: (id: number, isLocked: boolean) => void
): ReactNode {
  return (
    <XPCard
      title={gradableEvent.name}
      subtitle={gradableEvent.topic ?? ""}
      color={gradableEvent.gainedXp !== 0 ? "green" : "silver"}
      rightComponent={getStudentCardComponent(
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
