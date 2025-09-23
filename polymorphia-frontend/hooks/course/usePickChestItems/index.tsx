import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EquipmentService from "@/app/(logged-in)/equipment/EquipmentService";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { EquipmentChestOpenRequestDTO } from "@/interfaces/api/equipment";
import toast from "react-hot-toast";

export default function usePickChestItems() {
  const { courseId } = useUserDetails();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chestItems: EquipmentChestOpenRequestDTO) =>
      EquipmentService.pickChestItems(courseId, chestItems),
    onSuccess: () => {
      toast.success("Pomyślnie otwarto skrzynkę!");

      queryClient.invalidateQueries({ queryKey: ["equipment-items"] });
      queryClient.invalidateQueries({ queryKey: ["equipment-chests"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: () => toast.error("Nie udało się zapisać wyboru"),
  });
}
