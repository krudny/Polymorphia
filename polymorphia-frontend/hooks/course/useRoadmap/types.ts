import { GradableEventDTO } from "@/interfaces/api/gradable_event/types";

export interface UseRoadmap {
  data: GradableEventDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
