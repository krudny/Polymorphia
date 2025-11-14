import { ProjectVariantResponseDTO } from "@/interfaces/api/course/project";
import { API_HOST } from "@/services/api";
import { StudentDetailsDTOWithType } from "@/interfaces/api/user";

export const ProjectService = {
  getProjectVariant: async (
    userId: number,
    gradableEventId: number
  ): Promise<ProjectVariantResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/projects/variants?userId=${userId}&projectId=${gradableEventId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać wariantów projektu!");
    }

    return await response.json();
  },

  getProjectGroup: async (
    studentId: number,
    gradableEventId: number
  ): Promise<StudentDetailsDTOWithType[]> => {
    const response = await fetch(
      `${API_HOST}/projects/group?studentId=${studentId}&projectId=${gradableEventId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać grupy!");
    }

    return await response.json();
  },
};
