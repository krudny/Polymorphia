import { StudentLastGradableEventsDTO } from "@/interfaces/api/course-groups";

export interface UseStudentLastGradableEvents {
  data: StudentLastGradableEventsDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
