import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";
import { UseStudentProfile } from "@/hooks/course/useStudentProfile/types";

export default function useStudentProfile(): UseStudentProfile {
  const { courseId } = useUserDetails();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentProfile", courseId],
    queryFn: () => UserService.getStudentProfile(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
