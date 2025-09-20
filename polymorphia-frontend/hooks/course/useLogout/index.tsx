import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import toast from "react-hot-toast";

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.clear();
      toast.success("Wylogowałeś się z aplikacji");
    },
    onError: () => {
      toast.error("Błąd wylogowania");
    },
  });
}
