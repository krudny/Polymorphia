import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ResetPasswordRequestDTO } from "@/interfaces/api/user";
import { useRouter } from "next/navigation";
import UserService from "@/services/user";
import { UseResetPassword } from "@/hooks/general/useResetPassword/types";

export default function useResetPassword(): UseResetPassword {
  const router = useRouter();

  const mutation = useMutation<void, Error, ResetPasswordRequestDTO>({
    mutationFn: (request: ResetPasswordRequestDTO) => {
      return toast.promise(UserService.resetPassword(request), {
        loading: "Zmiana hasła...",
        success: "Hasło zmienione pomyślnie!",
        error: (error) => error.message,
      });
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  return { mutation };
}
