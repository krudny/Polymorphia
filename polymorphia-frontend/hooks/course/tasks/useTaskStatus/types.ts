import { TaskSubmissionStatusResponseDTO } from "@/interfaces/api/tasks/types";

export interface UseTaskStatus {
  submissionStatus: TaskSubmissionStatusResponseDTO | undefined;
  isSubmissionLoading: boolean;
  isSubmissionError: boolean;
}
