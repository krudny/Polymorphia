import XPCard from "@/components/xp-card/XPCard";
import { StudentGradableEventCardProps } from "@/views/gradable-events/student/types";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";

export default function StudentGradableEventCard({
  gradableEvent,
  size,
  handleClick,
}: StudentGradableEventCardProps) {
  const { hasPossibleReward, gainedXp, isGraded, isRewardAssigned } =
    gradableEvent;

  const color = gainedXp != undefined ? "green" : "sky";
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
      size={size}
      forceWidth={true}
      isLocked={gradableEvent.isLocked}
      onClick={() => handleClick(gradableEvent)}
    />
  );
}
