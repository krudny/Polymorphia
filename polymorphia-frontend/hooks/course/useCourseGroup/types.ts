import { StudentCourseGroupAssignmentIdResponseDTO } from "@/interfaces/api/student";

export interface UseCourseGroup {
  data: StudentCourseGroupAssignmentIdResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
