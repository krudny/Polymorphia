import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";
import { API_HOST } from "@/services/api";

export const RoadmapService = {
  getRoadmapData: async (
    courseId: number
  ): Promise<StudentGradableEventResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/courses/roadmap?courseId=${courseId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać roadmapy!");
    }

    return await response.json();
  },
};
