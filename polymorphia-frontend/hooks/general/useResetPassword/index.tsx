import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ResetPasswordRequestDTO } from "@/interfaces/api/password";
import { useRouter } from "next/navigation";
import { UseResetPassword } from "@/hooks/general/useResetPassword/types";
import PasswordService from "@/services/password";

export default function useResetPassword(): UseResetPassword {
  const router = useRouter();

  const mutation = useMutation<void, Error, ResetPasswordRequestDTO>({
    mutationFn: (request: ResetPasswordRequestDTO) => {
      return toast.promise(PasswordService.resetPassword(request), {
        loading: "Zmiana hasła...",
        success: "Hasło zmienione pomyślnie!",
      });
    },
    onSuccess: () => {
      router.refresh();
      router.push("/");
    },
  });

  return { mutation };
}
