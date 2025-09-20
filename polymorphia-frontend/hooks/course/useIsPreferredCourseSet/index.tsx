import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";

export default function useIsPreferredCourseSet() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["isCourseSet"],
    queryFn: () => UserService.isCourseIdSet(),
  });
  return { data, isLoading, isError };
}
