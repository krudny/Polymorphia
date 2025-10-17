import { useQuery } from "@tanstack/react-query";
import {
  UseCourseGroups,
  UseCourseGroupsProps,
} from "@/hooks/course/useCourseGroups/types";
import CourseGroupsService from "@/services/course-groups";
import { CourseGroupType } from "@/services/course-groups/types";

export default function useCourseGroups<T extends CourseGroupType>({
  courseId,
  isIndividual,
  type,
}: UseCourseGroupsProps<T>): UseCourseGroups<T> {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroups", courseId, isIndividual, type],
    queryFn: () =>
      CourseGroupsService.getCourseGroups(courseId, {
        isIndividual,
        type,
      }),
  });

  return { data, isLoading, isError };
}
