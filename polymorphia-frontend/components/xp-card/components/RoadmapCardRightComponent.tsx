import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { TargetTypes } from "@/interfaces/api/target";
import useShortGrade from "@/hooks/course/useShortGrade";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import { RoadmapCardRightComponentProps } from "@/app/(logged-in)/roadmap/types";

export default function RoadmapCardRightComponent({
  gradableEvent,
}: RoadmapCardRightComponentProps) {
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

  if (isLoading || !grade || isError) {
    return null;
  }
  const hasGainedReward =
    grade.gradeResponse.isGraded && grade.gradeResponse.hasReward;

  const { gainedXp, hasReward } = gradableEvent;
  const shouldGreyOutReward =
    !hasGainedReward && hasReward && grade.gradeResponse.isGraded;

  return (
    <XPCardPoints
      points={gainedXp}
      isSumLabelVisible={true}
      shouldGreyOutReward={shouldGreyOutReward}
      hasChest={hasReward}
      color="gray"
    />
  );
}
