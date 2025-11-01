import {
  GroupTargetTypes,
  TargetResponseDTO,
  TargetTypes,
} from "@/interfaces/api/target";
import areTargetsEqual from "@/providers/grading/utils/areTargetsEqual";

export default function isSelectedTargetStillAvailable(
  targets: TargetResponseDTO[],
  selectedTarget: TargetResponseDTO | null
): boolean {
  if (!selectedTarget || targets.length === 0) {
    return false;
  }

  return targets.some((target) => {
    if (target.type === TargetTypes.STUDENT) {
      return areTargetsEqual(target, selectedTarget);
    } else {
      const isGroupTargetMatch =
        target.groupType === GroupTargetTypes.MATCHING &&
        areTargetsEqual(target, selectedTarget);

      if (isGroupTargetMatch) {
        return true;
      }

      const isGroupMemberMatch = target.members.some((targetMember) => {
        return areTargetsEqual(
          { ...targetMember, type: TargetTypes.STUDENT },
          selectedTarget
        );
      });

      return isGroupMemberMatch;
    }
  });
}
