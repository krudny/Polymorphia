import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import { UseUserRole } from "@/hooks/general/useUserRole/types";

export default function useUserRole(): UseUserRole {
  const { data } = useQuery({
    queryKey: ["role"],
    queryFn: () => UserService.getRole(),
    select: (data) => data.role,
  });

  return { data };
}
