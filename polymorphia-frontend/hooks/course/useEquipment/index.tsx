import { useQuery } from "@tanstack/react-query";
import EquipmentService from "@/services/equipment";
import { UseEquipment } from "@/hooks/course/useEquipment/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useFetch from "@/hooks/general/useFetch";

export default function useEquipment(): UseEquipment {
  const { courseId, id } = useUserDetails();
  const { fetch: fetchFn } = useFetch();
  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useQuery({
    queryKey: ["equipmentItems", courseId, id],
    queryFn: () => EquipmentService.getItems(fetchFn, courseId),
  });

  const {
    data: chests,
    isLoading: isChestsLoading,
    error: chestsError,
  } = useQuery({
    queryKey: ["equipmentChests", courseId, id],
    queryFn: () => EquipmentService.getChests(fetchFn, courseId),
  });

  return {
    items,
    chests,
    isLoading: isItemsLoading || isChestsLoading,
    error: itemsError || chestsError || null,
  };
}
