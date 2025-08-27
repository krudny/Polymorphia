import XPCard from "@/components/xp-card/XPCard";
import { ReactNode } from "react";
import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";

// TOOO
export default function renderCard(
  gradableEvent: StudentGradableEventResponseDTO,
  isMobile: boolean,
  handleGradableEventClick: (id: number, isLocked: boolean) => void,
): ReactNode {
  // const color = gainedXp ? "green" : "silver";
  // const rightComponent = hasReward ? <XPCardChest /> : <XPCardPoints
  //   points={gainedXp}
  //   isSumLabelVisible={true}
  //   hasChest={hasChest}
  //   color={color}
  // />;

  const color = "green";

  return (
    <XPCard
      title={gradableEvent.name}
      subtitle={gradableEvent.topic ?? ""}
      color={color}
      // rightComponent={rightComponent}
      size={isMobile ? "sm" : "md"}
      forceWidth={!isMobile}
      isLocked={gradableEvent.isLocked}
      onClick={() =>
        handleGradableEventClick(gradableEvent.id, gradableEvent.isLocked)
      }
    />
  );
}
