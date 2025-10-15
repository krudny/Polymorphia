import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseInviteUser } from "./types";
import UserService from "@/app/(logged-in)/profile/UserService";
import { InviteRequestDTO, Roles } from "@/interfaces/api/user";
import useModalContext from "@/hooks/contexts/useModalContext";

export default function useInviteUser(): UseInviteUser {
  const { closeModal } = useModalContext();
  const mutation = useMutation<void, Error, InviteRequestDTO>({
    mutationFn: async (request) => {
      if (request.role === Roles.COORDINATOR) {
        toast.error("Zapraszanie koordynatorów nie jest obsługiwane");
        throw new Error("Zapraszanie koordynatorów nie jest obsługiwane");
      }

      return UserService.inviteUser(request);
    },
    onSuccess: () => {
      toast.success("Wysłano zaproszenie na maila!");
      closeModal();
    },
    onError: ({ message }: Error) => {
      toast.error(message);
    },
  });

  return { mutation };
}
