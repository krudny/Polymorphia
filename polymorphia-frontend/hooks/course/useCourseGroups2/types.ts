import {CourseGroupsResponseDTO} from "@/interfaces/api/course";

export interface UseCourseGroups2 {
  data: CourseGroupsResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
