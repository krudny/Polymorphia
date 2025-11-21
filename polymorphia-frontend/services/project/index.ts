import { ProjectVariantResponseDTO } from "@/interfaces/api/project";
import { ApiClient } from "@/services/api/client";
import { StudentDetailsDTOWithType } from "@/interfaces/api/user";

export const ProjectService = {
  getProjectVariant: async (
    userId: number,
    gradableEventId: number
  ): Promise<ProjectVariantResponseDTO[]> => {
    return await ApiClient.get<ProjectVariantResponseDTO[]>(
      `/projects/variants?userId=${userId}&projectId=${gradableEventId}`
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
