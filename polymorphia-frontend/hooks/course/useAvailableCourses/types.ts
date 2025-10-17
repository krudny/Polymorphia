import { AvailableCoursesDTO } from "@/interfaces/api/user-context";

export interface UseAvailableCourses {
  data: AvailableCoursesDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
