import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UserService from "@/services/user";
import useModalContext from "@/hooks/contexts/useModalContext";
import {
  UseDeleteAnimal,
  UseDeleteAnimalParams,
} from "@/hooks/course/useDeleteAnimal/types";

export default function useDeleteAnimal(): UseDeleteAnimal {
  const queryClient = useQueryClient();
  const { closeModal } = useModalContext();

  const mutation = useMutation<void, Error, UseDeleteAnimalParams>({
    mutationFn: ({ animalId }: UseDeleteAnimalParams) => {
      if (!animalId) {
        throw new Error("Nie podano ID zwierzaka.");
      }

      return toast.promise(UserService.deleteAnimal(animalId), {
        loading: "Usuwanie...",
        success: "Usunięto zwierzaka!",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseGroupTargets"],
      });
      closeModal();
    },
  });

  return { mutation };
}
