import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import { UsePointsSummary } from "@/hooks/course/gradable-event/usePointsSummary/types";
import { useEventParams } from "@/hooks/app/params/useEventParams";

export default function usePointsSummary(): UsePointsSummary {
  const { eventSectionId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pointsSummary", eventSectionId],
    queryFn: () => EventSectionService.getPointsSummary(eventSectionId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
