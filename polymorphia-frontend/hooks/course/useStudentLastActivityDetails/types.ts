import { StudentLastActivityDetailsDTO } from "@/interfaces/api/course-groups";

export interface UseStudentLastActivityDetails {
  data: StudentLastActivityDetailsDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface useStudentLastActivityDetailsProps {
  userId: number;
  gradableEventId: number;
}
