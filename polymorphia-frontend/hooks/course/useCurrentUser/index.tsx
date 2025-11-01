import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";
import { UseCurrentUser } from "@/hooks/course/useCurrentUser/types";
import useFetch from "@/hooks/general/useFetch";

export default function useCurrentUser(): UseCurrentUser {
  const { fetch } = useFetch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(fetch),
  });

  return { data, isLoading, isError };
}
