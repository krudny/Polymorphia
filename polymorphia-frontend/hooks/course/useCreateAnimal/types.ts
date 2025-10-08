import { UseMutationResult } from "@tanstack/react-query";
import { InviteRequestDTO } from "@/interfaces/api/user";
import { CreateAnimalRequestDTO } from "@/interfaces/api/student";

export interface UseCreateAnimal {
  mutation: UseMutationResult<void, Error, CreateAnimalRequestDTO>;
}
