import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";
import { UseStudentProfile } from "@/hooks/course/useStudentProfile/types";
import useFetch from "@/hooks/general/useFetch";

export default function useStudentProfile(): UseStudentProfile {
  const { courseId } = useUserDetails();
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["studentProfile", courseId],
    queryFn: () => UserService.getStudentProfile(fetchFn, courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
