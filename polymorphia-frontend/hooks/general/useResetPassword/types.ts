import { ResetPasswordRequestDTO } from "@/interfaces/api/user";
import { UseMutationResult } from "@tanstack/react-query";

export interface UseResetPassword {
  mutation: UseMutationResult<void, Error, ResetPasswordRequestDTO>;
}
