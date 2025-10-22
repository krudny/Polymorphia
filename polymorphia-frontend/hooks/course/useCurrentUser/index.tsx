import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";
import { UseCurrentUser } from "@/hooks/course/useCurrentUser/types";

export default function useCurrentUser(): UseCurrentUser {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(),
  });

  return { data, isLoading, isError };
}
