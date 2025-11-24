import { ProjectVariantResponseDTO } from "@/interfaces/api/project";
import { ApiClient } from "@/services/api/client";
import { StudentDetailsDTOWithType } from "@/interfaces/api/user";
import { TargetRequestDTO } from "@/interfaces/api/target";

export const ProjectService = {
  getProjectVariant: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<ProjectVariantResponseDTO[]> => {
    return ApiClient.post(
      `/projects/variants?projectId=${gradableEventId}`,
      target
    );
  },

  getProjectGroup: async (
    studentId: number,
    gradableEventId: number
  ): Promise<StudentDetailsDTOWithType[]> => {
    return await ApiClient.get<StudentDetailsDTOWithType[]>(
      `/projects/group?studentId=${studentId}&projectId=${gradableEventId}`
    );
  },
};
