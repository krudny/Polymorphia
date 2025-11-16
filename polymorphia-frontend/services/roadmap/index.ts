import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";
import { ApiClient } from "../api/client";

export const RoadmapService = {
  getRoadmapData: async (
    courseId: number
  ): Promise<StudentGradableEventResponseDTO[]> => {
    return await ApiClient.get<StudentGradableEventResponseDTO[]>(
      `/roadmap?courseId=${courseId}`
    );
  },
};
