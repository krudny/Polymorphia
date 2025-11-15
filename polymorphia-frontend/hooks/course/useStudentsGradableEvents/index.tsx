import { useQuery } from "@tanstack/react-query";
import { UseStudentsGradableEvents } from "@/hooks/course/useStudentsGradableEvents/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { GradableEventService } from "@/services/gradable-event";

export default function useStudentsGradableEvents(): UseStudentsGradableEvents {
  const { eventSectionId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentGradableEvents", eventSectionId],
    queryFn: () =>
      GradableEventService.getStudentGradableEvents(eventSectionId),
    staleTime: 1000 * 30,
  });

  return { data, isLoading, isError };
}
