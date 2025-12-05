import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { useEventParams } from "@/hooks/general/useEventParams";
import { UseCourseGroupDetails } from "@/hooks/course/useCourseGroupDetails/types";

export default function useCourseGroupDetails(): UseCourseGroupDetails {
  const { courseGroupId } = useEventParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courseGroupDetails", courseGroupId],
    queryFn: () => CourseGroupsService.getCourseGroupDetails(courseGroupId),
    enabled: !!courseGroupId,
  });

  return { data, isLoading, isError, refetch };
}
