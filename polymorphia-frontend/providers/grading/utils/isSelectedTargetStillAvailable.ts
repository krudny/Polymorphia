import { TargetResponseDTO } from "@/interfaces/api/grade/target";
import areTargetsEqual from "./areTargetsEqual";

export default function isSelectedTargetStillAvailable(
  targets: TargetResponseDTO[],
  selectedTarget: TargetResponseDTO | null
): boolean {
  if (!selectedTarget || targets.length === 0) {
    return false;
  }

  return targets.some((target) => {
    if (target.type === "STUDENT") {
      return areTargetsEqual(target, selectedTarget);
    } else {
      const isGroupTargetMatch =
        target.groupType === "MATCHING" &&
        areTargetsEqual(target, selectedTarget);

      if (isGroupTargetMatch) {
        return true;
      }

      const isGroupMemberMatch = target.members.some((targetMember) => {
        return areTargetsEqual(
          { ...targetMember, type: "STUDENT" },
          selectedTarget
        );
      });

      return isGroupMemberMatch;
    }
  });
}
