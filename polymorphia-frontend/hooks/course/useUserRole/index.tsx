import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";

export default function useUserRole() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userRole"],
    queryFn: () => UserService.getUserRole(),
  });
  return { data, isLoading, isError };
}
