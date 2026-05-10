import { StudentSummaryResponseDTO } from "@/interfaces/api/student";

export interface UseStudentSummary {
  data: StudentSummaryResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
