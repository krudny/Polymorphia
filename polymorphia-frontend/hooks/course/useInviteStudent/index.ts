import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseInviteUser } from "@/hooks/course/useInviteStudent/types";
import { InviteRequestDTO } from "@/interfaces/api/user";
import useModalContext from "@/hooks/contexts/useModalContext";
import UserService from "@/services/user";

export default function useInviteUser(): UseInviteUser {
  const { closeModal } = useModalContext();
  const mutation = useMutation<number, Error, InviteRequestDTO>({
    mutationFn: async (request) => UserService.inviteUser(request),
    onSuccess: () => {
      toast.success("Wysłano zaproszenie na maila!");
      closeModal();
    },
  });

  return { mutation };
}
