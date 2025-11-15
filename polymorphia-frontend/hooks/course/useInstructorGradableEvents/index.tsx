import { useQuery } from "@tanstack/react-query";
import { UseInstructorGradableEvents } from "@/hooks/course/useInstructorGradableEvents/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { GradableEventService } from "@/services/gradable-event";

export default function useInstructorGradableEvents(): UseInstructorGradableEvents {
  const { eventSectionId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["instructorGradableEvents", eventSectionId],
    queryFn: () =>
      GradableEventService.getInstructorGradableEvents(eventSectionId),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError };
}
