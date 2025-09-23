import { CourseGroupsResponseDTO } from "@/interfaces/api/course";

export interface UseCourseGroups {
  data: CourseGroupsResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
