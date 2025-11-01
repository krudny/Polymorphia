import { StudentLastActivityDTO } from "@/interfaces/api/course-groups";

export interface UseStudentLastActivity {
  data: StudentLastActivityDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
