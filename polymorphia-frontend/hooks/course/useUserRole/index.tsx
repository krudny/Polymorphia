import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";
import useFetch from "@/hooks/general/useFetch";

export default function useUserRole() {
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userRole"],
    queryFn: () => UserService.getUserRole(fetchFn),
  });
  return { data, isLoading, isError };
}
