import { useQuery } from "@tanstack/react-query";
import {
  UseCourseGroups,
  UseCourseGroupsProps,
} from "@/hooks/course/useCourseGroups/types";
import CourseGroupsService from "@/services/course-groups";
import { CourseGroupType } from "@/services/course-groups/types";

export default function useCourseGroups<T extends CourseGroupType>({
  courseId,
  type,
}: UseCourseGroupsProps<T>): UseCourseGroups<T> {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroups", courseId, type],
    queryFn: () => CourseGroupsService.getCourseGroups(courseId, type),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isError };
}
