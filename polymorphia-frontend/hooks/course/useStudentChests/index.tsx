import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { UseStudentChest } from "@/hooks/course/useStudentChests/types";
import useUserContext, {
  useUserDetails,
} from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";

export default function useStudentChests(
  userId: number | null
): UseStudentChest {
  const { courseId } = useUserDetails();
  const { userRole } = useUserContext();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["studentChest", userId],
    queryFn: () => CourseGroupsService.getStudentChests(courseId, userId!),
    refetchOnWindowFocus: false,
    enabled:
      userId !== null &&
      (userRole === Roles.INSTRUCTOR || userRole === Roles.COORDINATOR),
  });

  return { data, isLoading, isError, refetch };
}
