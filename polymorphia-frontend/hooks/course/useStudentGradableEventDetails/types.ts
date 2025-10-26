import { StudentGradableEventDetailsDTO } from "@/interfaces/api/course-groups";

export interface UseStudentGradableEventDetails {
  data: StudentGradableEventDetailsDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface useStudentGradableEventDetailsProps {
  userId: number;
  gradableEventId: number;
}
