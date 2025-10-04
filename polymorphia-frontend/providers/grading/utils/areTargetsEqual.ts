import { TargetResponseDTO, TargetTypes } from "@/interfaces/api/grade";

/// If any target is undefined/null, returns false.
export default function areTargetsEqual(
  t1: TargetResponseDTO | undefined | null,
  t2: TargetResponseDTO | undefined | null
): boolean {
  if (!t1 || !t2) {
    return false;
  }

  if (t1.type === TargetTypes.STUDENT && t2.type === TargetTypes.STUDENT) {
    return t1.id === t2.id;
  } else if (
    t1.type === TargetTypes.STUDENT_GROUP &&
    t2.type === TargetTypes.STUDENT_GROUP
  ) {
    return t1.groupId === t2.groupId;
  }

  return false;
}
