import { useQuery } from "@tanstack/react-query";
import EquipmentService from "@/app/(logged-in)/equipment/EquipmentService";
import { UseEquipment } from "@/hooks/course/useEquipment/types";

export default function useEquipment(): UseEquipment {
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useQuery({
    queryKey: ["equipment-items"],
    queryFn: () => EquipmentService.getItems(),
  });

  const {
    data: chests,
    isLoading: isChestsLoading,
    error: chestsError,
  } = useQuery({
    queryKey: ["equipment-chests"],
    queryFn: () => EquipmentService.getChests(),
  });

  return {
    items,
    chests,
    isLoading: isItemsLoading || isChestsLoading,
    error: itemsError || chestsError || null,
  };
}
