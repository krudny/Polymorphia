import { ApiClient } from "@/services/api/client";
import {
  InstructorGradableEventResponseDTO,
  StudentGradableEventResponseDTO,
} from "@/interfaces/api/gradable_event/types";

export const GradableEventService = {
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
