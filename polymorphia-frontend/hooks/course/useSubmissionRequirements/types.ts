import { SubmissionRequirementResponseDTO } from "@/interfaces/api/grade/submission";

export default interface UseSubmissionRequirements {
  data: SubmissionRequirementResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
