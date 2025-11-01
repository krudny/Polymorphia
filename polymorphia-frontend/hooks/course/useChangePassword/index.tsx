import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UserService from "@/services/user";
import { ChangePasswordDTO } from "@/interfaces/api/user";
import {
  UseChangePassword,
  UseChangePasswordProps,
} from "@/hooks/course/useChangePassword/types";

export default function useChangePassword({
  form,
}: UseChangePasswordProps): UseChangePassword {
  const mutation = useMutation({
    mutationFn: (request: ChangePasswordDTO) => {
      return toast.promise(UserService.changePassword(request), {
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
