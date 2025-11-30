import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseInviteUser } from "@/hooks/course/useInviteStudent/types";
import { InviteRequestDTO } from "@/interfaces/api/user";
import useModalContext from "@/hooks/contexts/useModalContext";
import UserService from "@/services/user";

export default function useInviteUser(): UseInviteUser {
  const { closeModal } = useModalContext();
  const mutation = useMutation<number, Error, InviteRequestDTO>({
    mutationFn: (request: InviteRequestDTO) => {
      return toast.promise(UserService.inviteUser(request), {
        loading: "Wysyłanie zaproszenia...",
        success: "Wysłano zaproszenie na maila!",
      });
    },
    onSuccess: () => {
      closeModal();
    },
  });

  return { mutation };
}
