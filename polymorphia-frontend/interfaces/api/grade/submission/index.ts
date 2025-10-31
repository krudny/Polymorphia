import { TargetRequestDTO } from "../target";

type SubmissionRequirementId = number;

export interface SubmissionDetails {
  url: string;
  isLocked: boolean;
}

export interface SubmissionRequirementResponseDTO {
  id: SubmissionRequirementId;
  name: string;
  isMandatory: boolean;
  orderIndex: number;
}

export type SubmissionDetailsResponseDTO = Record<
  SubmissionRequirementId,
  SubmissionDetails
>;

export interface SubmissionDetailsRequestDTO {
  target: TargetRequestDTO;
  details: SubmissionDetailsResponseDTO;
}
