import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.clear();
      toast.success("Wylogowałeś się z aplikacji");
      router.push("/");
    },
    onError: () => {
      toast.error("Błąd wylogowania");
    },
  });
}
