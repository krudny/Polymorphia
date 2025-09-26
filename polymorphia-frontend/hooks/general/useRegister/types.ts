import { UseMutationResult } from "@tanstack/react-query";
import { RegisterRequestDTO } from "@/interfaces/api/user";

export interface UseRegister {
  mutation: UseMutationResult<void, Error, RegisterRequestDTO>;
}
