import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";

export default function useUserRole() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userRole"],
    queryFn: () => UserService.getUserRole(),
  });
  return { data, isLoading, isError };
}
