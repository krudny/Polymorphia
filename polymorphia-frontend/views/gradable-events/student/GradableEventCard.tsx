import XPCard from "@/components/xp-card/XPCard";
import useShortGrade from "@/hooks/course/useShortGrade";
import { TargetTypes } from "@/interfaces/api/target";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { GradableEventCardProps } from "@/views/course/student/types";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";

export default function GradableEventCard({
  gradableEvent,
  isMobile,
  handleGradableEventClick,
}: GradableEventCardProps) {
  const { id: userId } = useUserDetails();
  const target = {
    id: userId,
    type: TargetTypes.STUDENT,
  };
  const {
    data: grade,
    isLoading,
    isError,
  } = useShortGrade(target, gradableEvent.id);
  const { hasReward, gainedXp } = gradableEvent;

  if (isLoading || !grade || isError) {
    return null;
  }
  const hasGainedReward =
    grade.gradeResponse.isGraded && grade.gradeResponse.hasReward;

  const color = gainedXp ? "green" : "sky";
  const rightComponent = (
    <XPCardPoints
      isSumLabelVisible={true}
      color="gray"
      points={gainedXp}
      hasChest={hasReward}
      shouldGreyOutReward={
        !hasGainedReward && hasReward && grade.gradeResponse.isGraded
      }
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
