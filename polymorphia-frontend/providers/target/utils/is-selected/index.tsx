import {
  StudentTargetData,
  TargetResponseDTO,
  TargetTypes,
} from "@/interfaces/api/target";
import areTargetsEqual from "@/providers/target/utils/are-targets-equal";
import useTargetContext from "@/hooks/contexts/useTargetContext";

export const isTargetSelected = (
  target: TargetResponseDTO,
  student: StudentTargetData
): boolean => {
  const {
    state: { selectedTarget },
  } = useTargetContext();
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
