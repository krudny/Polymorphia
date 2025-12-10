import { UseMutationResult } from "@tanstack/react-query";

export interface UseDeleteAnimalParams {
  animalId: number;
}

export interface UseDeleteAnimal {
  mutation: UseMutationResult<void, Error, UseDeleteAnimalParams>;
}
