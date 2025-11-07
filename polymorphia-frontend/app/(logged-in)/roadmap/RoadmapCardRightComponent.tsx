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
  const { data: grade, isLoading: isLoading } = useShortGrade(
    target,
    gradableEvent.id
  );

  if (isLoading || !grade) {
    return null;
  }
  const hasGainedReward =
    grade.gradeResponse.isGraded && grade.gradeResponse.hasReward;

  const { gainedXp, hasReward } = gradableEvent;

  return (
    <XPCardPoints
      points={gainedXp}
      isSumLabelVisible={true}
      shouldGreyOutReward={
        !hasGainedReward && hasReward && grade.gradeResponse.isGraded
      }
      hasChest={hasReward}
      color="gray"
    />
  );
}
