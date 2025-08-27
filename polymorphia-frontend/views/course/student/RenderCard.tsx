import XPCard from "@/components/xp-card/XPCard";
import { ReactNode } from "react";
import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";
import XPCardChest from "@/components/xp-card/components/XPCardChest";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";

export default function renderCard(
  gradableEvent: StudentGradableEventResponseDTO,
  isMobile: boolean,
  handleGradableEventClick: (id: number, isLocked: boolean) => void,
): ReactNode {
  const { hasReward, gainedXp } = gradableEvent;
  const color = gainedXp ? "green" : "silver";
  const rightComponent = hasReward ? <XPCardChest /> : <XPCardPoints
    points={gainedXp}
    isSumLabelVisible={true}
    hasChest={hasReward}
    color={color}
  />;
  
  return (
    <XPCard
      title={gradableEvent.name}
      subtitle={gradableEvent.topic ?? ""}
      color={color}
      rightComponent={rightComponent}
      size={isMobile ? "sm" : "md"}
      forceWidth={!isMobile}
      isLocked={gradableEvent.isLocked}
      onClick={() =>
        handleGradableEventClick(gradableEvent.id, gradableEvent.isLocked)
      }
    />
  );
}
