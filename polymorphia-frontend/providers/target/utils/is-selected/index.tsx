import {
  StudentTargetData,
  TargetResponseDTO,
  TargetTypes,
} from "@/interfaces/api/target";
import areTargetsEqual from "@/providers/target/utils/are-targets-equal";

export const isTargetSelected = (
  target: TargetResponseDTO,
  student: StudentTargetData,
  selectedTarget: TargetResponseDTO | null
): boolean => {
  if (!selectedTarget) {
    return false;
  }

  const isTargetMatchingSelectedTarget = areTargetsEqual(
    selectedTarget,
    target
  );

  const isStudentSelectedFromGroup =
    selectedTarget?.type === TargetTypes.STUDENT &&
    selectedTarget.id === student.id;

  return isTargetMatchingSelectedTarget || isStudentSelectedFromGroup;
};
