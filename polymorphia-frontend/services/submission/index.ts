import {
  SubmissionRequirementResponseDTO,
  SubmissionDetailsResponseDTO,
  SubmissionDetailsRequestDTO,
} from "@/interfaces/api/grade/submission";
import { TargetRequestDTO } from "@/interfaces/api/target";
import { ApiClient } from "@/services/api/client";

export const SubmissionService = {
  getSubmissionRequirements: async (
    gradableEventId: number
  ): Promise<SubmissionRequirementResponseDTO[]> => {
    return ApiClient.get<SubmissionRequirementResponseDTO[]>(
      `/submissions/requirements?gradableEventId=${gradableEventId}`
    );
  },

  getSubmissionDetails: async (
    gradableEventId: number,
    target: TargetRequestDTO
  ): Promise<SubmissionDetailsResponseDTO> => {
    return ApiClient.post<SubmissionDetailsResponseDTO>(
      `/submissions/details?gradableEventId=${gradableEventId}`,
      target
    );
  },

  submitSubmissions: async (
    gradableEventId: number,
    submissionDetails: SubmissionDetailsRequestDTO
  ): Promise<void> => {
    await ApiClient.put(
      `/submissions/details?gradableEventId=${gradableEventId}`,
      submissionDetails
    );
  },
};
