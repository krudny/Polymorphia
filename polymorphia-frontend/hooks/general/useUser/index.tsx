import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import { UseCurrentUser } from "@/hooks/general/useUser/types";

export default function useCurrentUser(): UseCurrentUser {
  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(),
  });

  return { data, isLoading };
}