import { useQuery } from "@tanstack/react-query";
import { UseCourseGroup } from "@/hooks/course/useCourseGroup/types";
import UserService from "@/services/user";

export default function useCourseGnoroup(
  courseId: number,
  isStudent: boolean = true
): UseCourseGroup {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroup", courseId],
    queryFn: () => UserService.getCourseGroup(courseId),
    refetchOnMount: isStudent,
    enabled: isStudent,
  });

  return { data, isLoading, isError };
}
