import {
  SubmissionRequirementResponseDTO,
  SubmissionDetailsResponseDTO,
  SubmissionDetailsRequestDTO,
} from "@/interfaces/api/grade/submission";
import { TargetRequestDTO } from "@/interfaces/api/target";
import { API_HOST } from "@/services/api";

export const SubmissionService = {
  getSubmissionRequirements: async (
    gradableEventId: number
  ): Promise<SubmissionRequirementResponseDTO[]> => {
    const response = await fetch(
      `${API_HOST}/submissions/requirements?gradableEventId=${gradableEventId}`,
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać wymagań!");
    }

    return await response.json();
  },

  getSubmissionDetails: async (
    gradableEventId: number,
    target: TargetRequestDTO
  ): Promise<SubmissionDetailsResponseDTO> => {
    const response = await fetch(
      `${API_HOST}/submissions/details?gradableEventId=${gradableEventId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(target),
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać oddanego zadania!");
    }

    return await response.json();
  },

  submitSubmissions: async (
    gradableEventId: number,
    submissionDetails: SubmissionDetailsRequestDTO
  ): Promise<void> => {
    const response = await fetch(
      `${API_HOST}/submissions/details?gradableEventId=${gradableEventId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(submissionDetails),
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się zapisać oddanego zadania!");
    }
  },
};
