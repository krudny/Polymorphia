import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import { UseStudentProfile } from "@/hooks/course/useStudentProfile/types";

export default function useStudentProfile(): UseStudentProfile {
  const { courseId } = useUserDetails();
  const { data, isLoading, error } = useQuery({
    queryKey: ["studentProfile", courseId],
    queryFn: () => UserService.getStudentProfile(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
