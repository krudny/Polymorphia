import { useQuery } from "@tanstack/react-query";
import { UsePotentialXp } from "@/hooks/course/usePotentialXp/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import EquipmentService from "@/services/equipment/index";
import useFetch from "@/hooks/general/useFetch";

export default function usePotentialXp(
  assignedChestId: number
): UsePotentialXp {
  const { courseId } = useUserDetails();
  const { fetch: fetchFn } = useFetch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["potentialXp", assignedChestId],
    queryFn: () => {
      return EquipmentService.getPotentialXp(
        fetchFn,
        courseId,
        assignedChestId
      );
    },
  });

  return { data, isLoading, isError };
}
