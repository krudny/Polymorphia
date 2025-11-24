import {
  SubmissionDetail,
  SubmissionRequirementResponseDTO,
} from "@/interfaces/api/grade/submission";

export interface SubmissionDetailProps {
  detail: SubmissionDetail;
  requirement: SubmissionRequirementResponseDTO;
}
