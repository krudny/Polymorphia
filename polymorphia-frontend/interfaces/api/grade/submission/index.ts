import { TargetRequestDTO } from "@/interfaces/api/target";

type SubmissionRequirementId = number;

export interface SubmissionDetail {
  url: string;
  isLocked: boolean;
}

export interface SubmissionRequirementResponseDTO {
  id: SubmissionRequirementId;
  name: string;
  isMandatory: boolean;
  orderIndex: number;
}

export type SubmissionDetails = Record<
  SubmissionRequirementId,
  SubmissionDetail
>;

export interface SubmissionDetailsResponseDTO {
  details: SubmissionDetails;
  modifiedDate?: string;
}

export interface SubmissionDetailsRequestDTO {
  target: TargetRequestDTO;
  details: SubmissionDetails;
}
