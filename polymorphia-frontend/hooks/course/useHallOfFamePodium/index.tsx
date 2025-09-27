import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
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
