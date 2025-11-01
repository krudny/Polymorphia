import { TargetResponseDTO, TargetTypes } from "@/interfaces/api/target";
import areTargetsEqual from "@/providers/target/utils/are-targets-equal";

export default function isSelectedTargetStillAvailable(
  targets: TargetResponseDTO[],
  selectedTarget: TargetResponseDTO | null
): boolean {
  if (!selectedTarget) {
    return false;
  }

  // Check if the selected target exists in the targets list
  const targetExists = targets.some((target) =>
    areTargetsEqual(target, selectedTarget)
  );

  if (targetExists) {
    return true;
  }

  // If selected target is a student, check if they exist in any group
  if (selectedTarget.type === TargetTypes.STUDENT) {
    return targets.some((target) => {
      if (target.type === TargetTypes.STUDENT_GROUP) {
        return target.members.some((member) => member.id === selectedTarget.id);
      }
      return false;
    });
  }

  return false;
}
