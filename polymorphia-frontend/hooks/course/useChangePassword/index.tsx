import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ChangePasswordDTO } from "@/interfaces/api/password";
import {
  UseChangePassword,
  UseChangePasswordProps,
} from "@/hooks/course/useChangePassword/types";
import PasswordService from "@/services/password";

export default function useChangePassword({
  form,
}: UseChangePasswordProps): UseChangePassword {
  const mutation = useMutation({
    mutationFn: (request: ChangePasswordDTO) => {
      return toast.promise(PasswordService.changePassword(request), {
        loading: "Zmienianie hasła...",
        success: "Hasło zmieniono pomyślnie!",
      });
    },
    onSuccess: async () => {
      form.reset();
    },
  });

  return { mutation };
}
