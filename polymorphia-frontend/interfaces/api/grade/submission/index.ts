// Added for readability
type SubmissionRequirementId = number;
type SubmissionUrl = string;

export interface SubmissionRequirementResponseDTO {
  id: SubmissionRequirementId;
  name: number;
  isMandatory: boolean;
  orderIndex: number;
}

export type SubmissionDataResponseDTO = Record<
  SubmissionRequirementId,
  SubmissionUrl
>;
