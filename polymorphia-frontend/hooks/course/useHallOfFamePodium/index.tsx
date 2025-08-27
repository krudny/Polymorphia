import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/app/(logged-in)/hall-of-fame/HallOfFameService";
import { UseHallOfFamePodium } from "@/hooks/course/useHallOfFamePodium/types";

export default function useHallOfFamePodium(): UseHallOfFamePodium {
  const { data, isLoading } = useQuery({
    queryKey: ["podium"],
    queryFn: () => HallOfFameService.getPodium(),
  });

  return { data, isLoading };
}