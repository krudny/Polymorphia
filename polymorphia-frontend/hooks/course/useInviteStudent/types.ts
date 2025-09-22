import {UseMutationResult} from "@tanstack/react-query";
import {InviteStudentRequestDTO} from "@/interfaces/api/user";

export interface UseInviteStudent {
  mutation: UseMutationResult<
    void,
    Error,
    InviteStudentRequestDTO
  >;
}
