import { StudentProfileResponseDTO } from "../../../interfaces/api/student";

export interface UseStudentProfile {
  data: StudentProfileResponseDTO | undefined;
  isLoading: boolean;
  error: Error | null;
}
