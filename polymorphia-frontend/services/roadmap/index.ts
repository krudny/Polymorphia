import { ApiClient } from "@/services/api/client";
import { GradableEventDTO } from "@/interfaces/api/gradable_event/types";

export const RoadmapService = {
  getRoadmapData: async (courseId: number): Promise<GradableEventDTO[]> => {
    return await ApiClient.get<GradableEventDTO[]>(
      `/roadmap?courseId=${courseId}`
    );
  },
};
