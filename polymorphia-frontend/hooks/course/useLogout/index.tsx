import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";

export default function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      console.log("Logged out successfully");
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
}
