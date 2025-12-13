import { SubmissionDetailsResponseDTO } from "@/interfaces/api/grade/submission";

export default interface UseSubmissionDetails {
  data: SubmissionDetailsResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
