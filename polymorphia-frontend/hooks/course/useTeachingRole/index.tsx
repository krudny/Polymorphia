import { useQuery } from "@tanstack/react-query";
import { UseTeachingRole } from "./types";
import CourseGroupsService from "@/services/course-groups";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useTeachingRole(): UseTeachingRole {
  const { courseId } = useUserDetails();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["teachingRole", courseId],
    queryFn: () => CourseGroupsService.getTeachingRoleUsers(courseId),
  });

  return { data, isLoading, isError, refetch };
}
