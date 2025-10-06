import { useMutation, useQueryClient } from "@tanstack/react-query";
import EquipmentService from "@/app/(logged-in)/equipment/EquipmentService";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { EquipmentChestOpenRequestDTO } from "@/interfaces/api/equipment";
import toast from "react-hot-toast";

export default function usePickChestItems() {
  const { courseId } = useUserDetails();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chestItems: EquipmentChestOpenRequestDTO) => {
      const result = await EquipmentService.pickChestItems(
        courseId,
        chestItems
      );

      await queryClient.invalidateQueries({ queryKey: ["equipmentItems"] });
      await queryClient.invalidateQueries({ queryKey: ["equipmentChests"] });
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      return result;
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
