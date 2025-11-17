import { useQuery } from "@tanstack/react-query";
import EquipmentService from "@/services/equipment";
import { UseEquipment } from "@/hooks/course/useEquipment/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useEquipment(): UseEquipment {
  const { courseId, id } = useUserDetails();
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useQuery({
    queryKey: ["equipmentItems", courseId, id],
    queryFn: () => EquipmentService.getItems(courseId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 15,
  });

  const {
    data: chests,
    isLoading: isChestsLoading,
    error: chestsError,
  } = useQuery({
    queryKey: ["equipmentChests", courseId, id],
    queryFn: () => EquipmentService.getChests(courseId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 15,
  });

  return {
    items,
    chests,
    isLoading: isItemsLoading || isChestsLoading,
    error: itemsError || chestsError || null,
  };
}
