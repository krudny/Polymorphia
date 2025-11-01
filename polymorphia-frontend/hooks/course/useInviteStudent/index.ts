import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseInviteUser } from "./types";
import { InviteRequestDTO } from "@/interfaces/api/user";
import useModalContext from "@/hooks/contexts/useModalContext";
import UserService from "@/services/user";
import useFetch from "@/hooks/general/useFetch";

export default function useInviteUser(): UseInviteUser {
  const { closeModal } = useModalContext();
  const { fetch: fetchFn } = useFetch();
  const mutation = useMutation<void, Error, InviteRequestDTO>({
    mutationFn: async (request) => UserService.inviteUser(fetchFn, request),
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
