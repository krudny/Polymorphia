import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UserService from "@/services/user";
import { ChangePasswordDTO } from "@/interfaces/api/user";
import {
  UseChangePassword,
  UseChangePasswordProps,
} from "@/hooks/course/useChangePassword/types";
import useFetch from "@/hooks/general/useFetch";

export default function useChangePassword({
  form,
}: UseChangePasswordProps): UseChangePassword {
  const { fetch: fetchFn } = useFetch();
  const mutation = useMutation({
    mutationFn: (request: ChangePasswordDTO) => {
      return toast.promise(UserService.changePassword(fetchFn, request), {
        loading: "Zmienianie hasła...",
        success: "Hasło zmieniono pomyślnie!",
        error: () => `Wystąpił błąd przy zmianie hasła!`,
      });
    },
    onSuccess: async () => {
      form.reset();
    },
  });

  return { mutation };
}
