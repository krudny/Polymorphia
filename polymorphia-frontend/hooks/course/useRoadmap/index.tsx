import { useQuery } from "@tanstack/react-query";
import { RoadmapService } from "@/services/roadmap";
import { UseRoadmap } from "@/hooks/course/useRoadmap/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export function useRoadmap(): UseRoadmap {
  const { courseId } = useUserDetails();
  const { data, isLoading } = useQuery({
    queryKey: ["roadmap"],
    queryFn: () => RoadmapService.getRoadmapData(courseId),
  });

  return { data, isLoading };
}
