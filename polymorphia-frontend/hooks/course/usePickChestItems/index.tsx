import { useMutation, useQueryClient } from "@tanstack/react-query";
import EquipmentService from "@/services/equipment/index";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { EquipmentChestOpenRequestDTO } from "@/interfaces/api/equipment";
import toast from "react-hot-toast";
import { UsePickChestItems } from "@/hooks/course/usePickChestItems/types";
import useFetch from "@/hooks/general/useFetch";

export default function usePickChestItems(): UsePickChestItems {
  const { courseId } = useUserDetails();
  const queryClient = useQueryClient();
  const { fetch: fetchFn } = useFetch();

  return useMutation({
    mutationFn: async (chestItems: EquipmentChestOpenRequestDTO) => {
      return toast.promise(
        EquipmentService.pickChestItems(fetchFn, courseId, chestItems).then(
          async (result) => {
            await queryClient.invalidateQueries({
              queryKey: ["equipmentItems"],
            });
            await queryClient.invalidateQueries({
              queryKey: ["equipmentChests"],
            });
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            return result;
          }
        ),
        {
          loading: "Otwieranie skrzynki...",
          success: "Skrzynka otwarta pomyślnie!",
          error: "Wystąpił błąd podczas otwierania skrzynki",
        }
      );
    },
  });
}
