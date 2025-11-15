import {
  InstructorGradableEventResponseDTO,
  StudentGradableEventResponseDTO,
} from "@/interfaces/api/course";
import { ApiClient } from "@/services/api/client";

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
