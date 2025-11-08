import { TargetResponseDTO, TargetTypes } from "@/interfaces/api/target";

export default function areTargetsEqual(
  target1: TargetResponseDTO | null,
  target2: TargetResponseDTO | null
): boolean {
  if (!target1 || !target2) {
    return false;
  }

  if (target1.type !== target2.type) {
    return false;
  }

  if (target1.type === TargetTypes.STUDENT) {
    return target1.id === (target2 as typeof target1).id;
  }

  if (target1.type === TargetTypes.STUDENT_GROUP) {
    return target1.groupId === (target2 as typeof target1).groupId;
  }

  return false;
}
