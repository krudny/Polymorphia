import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";

// TODO: to be deleted
export default function useRandomUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["randomUsers"],
    queryFn: () => UserService.getRandomUsers(),
  });

  return { data, isLoading, isError };
}
