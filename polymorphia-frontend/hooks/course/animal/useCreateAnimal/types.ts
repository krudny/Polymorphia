import { UseMutationResult } from "@tanstack/react-query";
import { CreateAnimalRequestDTO } from "@/interfaces/api/student";

export interface UseCreateAnimal {
  mutation: UseMutationResult<void, Error, CreateAnimalRequestDTO>;
}
