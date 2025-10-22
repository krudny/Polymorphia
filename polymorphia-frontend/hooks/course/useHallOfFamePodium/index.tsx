import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/services/hall-of-fame";
import { UseHallOfFamePodium } from "@/hooks/course/useHallOfFamePodium/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useHallOfFamePodium(): UseHallOfFamePodium {
  const { courseId } = useUserDetails();
  const { data, isLoading } = useQuery({
    queryKey: ["podium"],
    queryFn: () => HallOfFameService.getPodium(courseId),
  });

  return { data, isLoading };
}
