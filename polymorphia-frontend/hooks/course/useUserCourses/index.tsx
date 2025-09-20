import { useQuery } from "@tanstack/react-query";
import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import UserService from "@/app/(logged-in)/profile/UserService";

export default function useUserCourses() {
  const { data, isLoading, isError } = useQuery<AvailableCoursesDTO[]>({
    queryKey: ["userCourses"],
    queryFn: () => UserService.getUserCourses(),
  });

  return { data, isLoading, isError };
}
