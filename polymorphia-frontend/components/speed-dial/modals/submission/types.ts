import {
  SubmissionDetailsResponseDTO,
  SubmissionRequirementResponseDTO,
} from "@/interfaces/api/grade/submission";

export interface SubmissionsModalContentProps {
  requirements: SubmissionRequirementResponseDTO[];
  details: SubmissionDetailsResponseDTO;
}
