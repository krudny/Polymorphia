import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseLogoutProps } from "@/hooks/course/useLogout/types";

export default function useLogout({ showToast = true }: UseLogoutProps = {}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => AuthService.logout(fetch),
    onSuccess: () => {
      queryClient.clear();
      if (showToast) {
        toast.success("Wylogowałeś się z aplikacji", { id: "logout-success" });
      }
      router.push("/");
    },
    onError: () => {
      if (showToast) {
        toast.error("Błąd wylogowania");
      }
    },
  });
}
