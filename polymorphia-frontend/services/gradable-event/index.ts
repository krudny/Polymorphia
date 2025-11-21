import { ApiClient } from "@/services/api/client";
import {
  BaseGradableEventResponseDTO,
  StudentGradableEventResponseDTO,
  TeachingRoleGradableEventResponseDTO,
} from "@/interfaces/api/gradable_event/types";

export const GradableEventService = {
  getGradableEvent: async (
    gradableEventId: number
  ): Promise<BaseGradableEventResponseDTO> => {
    return await ApiClient.get<BaseGradableEventResponseDTO>(
      `/gradable-events/${gradableEventId}`
    );
  },

  getStudentGradableEvents: async (
    eventSectionId: number
  ): Promise<StudentGradableEventResponseDTO[]> => {
    return await ApiClient.get<StudentGradableEventResponseDTO[]>(
      `/gradable-events?eventSectionId=${eventSectionId}`
    );
  },

  getInstructorGradableEvents: async (
    eventSectionId: number
  ): Promise<TeachingRoleGradableEventResponseDTO[]> => {
    return await ApiClient.get<TeachingRoleGradableEventResponseDTO[]>(
      `/gradable-events?eventSectionId=${eventSectionId}`
    );
  },
};
