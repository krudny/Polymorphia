import { TargetResponseDTO, TargetTypes } from "@/interfaces/api/grade";

/// If any target is undefined/null, returns false.
export default function areTargetsEqual(
  target1: TargetResponseDTO | undefined | null,
  target2: TargetResponseDTO | undefined | null
): boolean {
  if (!target1 || !target2) {
    return false;
  }

  if (
    target1.type === TargetTypes.STUDENT &&
    target2.type === TargetTypes.STUDENT
  ) {
    return target1.id === target2.id;
  } else if (
    target1.type === TargetTypes.STUDENT_GROUP &&
    target2.type === TargetTypes.STUDENT_GROUP
  ) {
    return target1.groupId === target2.groupId;
  }

  return false;
}
