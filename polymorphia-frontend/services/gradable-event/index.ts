import { ApiClient } from "@/services/api/client";
import {
  BaseGradableEventResponseDTO,
  InstructorGradableEventResponseDTO,
  StudentGradableEventResponseDTO,
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
  ): Promise<InstructorGradableEventResponseDTO[]> => {
    return await ApiClient.get<InstructorGradableEventResponseDTO[]>(
      `/gradable-events?eventSectionId=${eventSectionId}`
    );
  },
};
