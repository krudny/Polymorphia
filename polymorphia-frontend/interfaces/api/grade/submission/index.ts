type SubmissionRequirementId = number;

export interface SubmissionDetails {
  url: string;
  isLocked: boolean;
}

export interface SubmissionRequirementResponseDTO {
  id: SubmissionRequirementId;
  name: number;
  isMandatory: boolean;
  orderIndex: number;
}

export type SubmissionDetailsResponseDTO = Record<
  SubmissionRequirementId,
  SubmissionDetails
>;
