import { useQuery } from "@tanstack/react-query";
import EquipmentService from "@/services/equipment";
import { UseEquipment } from "@/hooks/course/useEquipment/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useEquipment(): UseEquipment {
  const { courseId } = useUserDetails();
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useQuery({
    queryKey: ["equipmentItems"],
    queryFn: () => EquipmentService.getItems(courseId),
  });

  const {
    data: chests,
    isLoading: isChestsLoading,
    error: chestsError,
  } = useQuery({
    queryKey: ["equipmentChests"],
    queryFn: () => EquipmentService.getChests(courseId),
  });

  return {
    items,
    chests,
    isLoading: isItemsLoading || isChestsLoading,
    error: itemsError || chestsError || null,
  };
}
