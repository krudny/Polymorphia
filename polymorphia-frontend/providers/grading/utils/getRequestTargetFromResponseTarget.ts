import {
  TargetRequestDTO,
  TargetResponseDTO,
  TargetTypes,
} from "@/interfaces/api/grade";

export function getRequestTargetFromResponseTarget(
  response: TargetResponseDTO
): TargetRequestDTO {
  if (response.type === TargetTypes.STUDENT) {
    return {
      type: TargetTypes.STUDENT,
      id: response.id,
    };
  } else {
    return {
      type: TargetTypes.STUDENT_GROUP,
      groupId: response.groupId,
    };
  }
}
