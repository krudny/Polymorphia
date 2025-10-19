import { useQuery } from "@tanstack/react-query";
import { UsePotentialXp } from "@/hooks/course/usePotentialXp/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import EquipmentService from "@/services/equipment/index";

export default function usePotentialXp(
  assignedChestId: number | undefined
): UsePotentialXp {
  const { courseId } = useUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["potentialXp", assignedChestId],
    queryFn: () => {
      if (!assignedChestId) {
        throw new Error("Assigned chest ID is required");
      }
      return EquipmentService.getPotentialXp(courseId, assignedChestId);
    },
    enabled: !!assignedChestId,
  });

  return { data, isLoading, isError };
}
