import {UseMutationResult} from "@tanstack/react-query";

export interface UseRegisterParams {
  invitationToken: string;
  animalName: string;
  password: string;
}

export interface UseRegister {
  mutation: UseMutationResult<
    void,
    Error,
    UseRegisterParams
  >;
}
