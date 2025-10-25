import { useQuery } from "@tanstack/react-query";
import { UsePotentialXp } from "@/hooks/course/usePotentialXp/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import EquipmentService from "@/services/equipment/index";

export default function usePotentialXp(
  assignedChestId: number
): UsePotentialXp {
  const { courseId } = useUserDetails();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["potentialXp", assignedChestId],
    queryFn: () => {
      return EquipmentService.getPotentialXp(courseId, assignedChestId);
    },
  });

  return { data, isLoading, isError };
}
