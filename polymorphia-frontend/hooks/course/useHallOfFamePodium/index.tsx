import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/services/hall-of-fame";
import { UseHallOfFamePodium } from "@/hooks/course/useHallOfFamePodium/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useFetch from "@/hooks/general/useFetch";

export default function useHallOfFamePodium(): UseHallOfFamePodium {
  const { courseId } = useUserDetails();
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading } = useQuery({
    queryKey: ["podium"],
    queryFn: () => HallOfFameService.getPodium(fetchFn, courseId),
  });

  return { data, isLoading };
}
