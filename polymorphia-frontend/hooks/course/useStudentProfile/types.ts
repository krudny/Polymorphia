import { StudentProfileDTO } from "@/interfaces/api/profile";

export interface UseStudentProfile {
  data: StudentProfileDTO | undefined;
  isLoading: boolean;
  error: Error | null;
}
