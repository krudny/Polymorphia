import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import { UseUser } from "@/hooks/general/useUser/types";

export default function useUser(): UseUser {
  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => UserService.getCurrentUser(),
  });

  return { data, isLoading };
}