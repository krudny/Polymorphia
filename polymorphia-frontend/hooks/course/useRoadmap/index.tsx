import { useQuery } from "@tanstack/react-query";
import { RoadmapService } from "@/app/(logged-in)/roadmap/RoadmapService";
import { UseRoadmap } from "@/hooks/course/useRoadmap/types";

export function useRoadmap(): UseRoadmap {
  const { data, isLoading } = useQuery({
    queryKey: ["roadmap"],
    queryFn: () => RoadmapService.getRoadmapData(),
  });

  return { data, isLoading };
}
