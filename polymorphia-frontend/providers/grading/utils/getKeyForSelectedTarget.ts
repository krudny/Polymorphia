import {
  TargetRequestDTO,
  TargetResponseDTO,
  TargetTypes,
} from "@/interfaces/api/target";

export function getKeyForSelectedTarget(
  selectedTarget: TargetResponseDTO | TargetRequestDTO | null
): string | undefined {
  if (selectedTarget === null) {
    return undefined;
  } else if (selectedTarget.type === TargetTypes.STUDENT) {
    return `${selectedTarget.type}_${selectedTarget.id}`;
  } else {
    return `${selectedTarget.type}_${selectedTarget.groupId}`;
  }
}
