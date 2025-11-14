import XPCard from "@/components/xp-card/XPCard";
import { GradableEventCardProps } from "@/views/course/student/types";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";

export default function GradableEventCard({
  gradableEvent,
  isMobile,
  handleGradableEventClick,
}: GradableEventCardProps) {
  const { hasPossibleReward, gainedXp, isGraded, isRewardAssigned } =
    gradableEvent;

  console.log(isRewardAssigned, isGraded);

  const color = gainedXp ? "green" : "sky";
  const rightComponent = (
    <XPCardPoints
      isSumLabelVisible={true}
      color="gray"
      points={gainedXp}
      hasChest={hasPossibleReward}
      shouldGreyOutReward={isGraded && !isRewardAssigned}
    />
  );

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
