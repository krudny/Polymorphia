import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PasswordService from "@/services/password";
import { UseForgotPassword } from "./types";
import { ForgotPasswordRequestDTO } from "@/interfaces/api/password";

export default function useForgotPassword(): UseForgotPassword {
  const mutation = useMutation<void, Error, ForgotPasswordRequestDTO>({
    mutationFn: (request: ForgotPasswordRequestDTO) => {
      return toast.promise(PasswordService.forgotPassword(request), {
        loading: "Wysyłanie emaila...",
        success: "Email z linkiem został wysłany!",
      });
    },
  });

  return { mutation };
}
