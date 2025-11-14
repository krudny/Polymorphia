import {
  InstructorGradableEventResponseDTO,
  StudentGradableEventResponseDTO,
} from "@/interfaces/api/course";
import { API_HOST } from "@/services/api";

export const GradableEventService = {
  getStudentGradableEvents: async (
    eventSectionId: number
  ): Promise<StudentGradableEventResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/gradable-events?eventSectionId=${eventSectionId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać wydarzeń!");
    }

    return await response.json();
  },

  getInstructorGradableEvents: async (
    eventSectionId: number
  ): Promise<InstructorGradableEventResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/gradable-events?eventSectionId=${eventSectionId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać wydarzeń!");
    }

    return await response.json();
  },
};
