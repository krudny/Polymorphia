import { UseMutationResult } from "@tanstack/react-query";
import { InviteRequestDTO } from "@/interfaces/api/user";

export interface UseInviteUser {
  mutation: UseMutationResult<void, Error, InviteRequestDTO>;
}
