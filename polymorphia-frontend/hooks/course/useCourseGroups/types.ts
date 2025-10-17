import {
  CourseGroupResponse,
  CourseGroupType,
} from "@/services/course-groups/types";

export interface UseCourseGroups<T extends CourseGroupType> {
  data: CourseGroupResponse<T> | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface UseCourseGroupsProps<T extends CourseGroupType> {
  courseId: number;
  isIndividual: boolean;
  type: T;
}
