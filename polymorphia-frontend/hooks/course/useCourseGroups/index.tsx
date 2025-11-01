import { useQuery } from "@tanstack/react-query";
import {
  UseCourseGroups,
  UseCourseGroupsProps,
} from "@/hooks/course/useCourseGroups/types";
import CourseGroupsService from "@/services/course-groups";
import { CourseGroupType } from "@/services/course-groups/types";
import useFetch from "@/hooks/general/useFetch";

export default function useCourseGroups<T extends CourseGroupType>({
  courseId,
  type,
}: UseCourseGroupsProps<T>): UseCourseGroups<T> {
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroups", courseId, type],
    queryFn: () => CourseGroupsService.getCourseGroups(fetchFn, courseId, type),
  });

  return { data, isLoading, isError };
}
