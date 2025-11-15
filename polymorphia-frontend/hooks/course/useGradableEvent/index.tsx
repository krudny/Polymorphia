import { useEventParams } from "@/hooks/general/useEventParams";
import { EventSectionService } from "@/services/event-section";
import { useQuery } from "@tanstack/react-query";
import { UseGradableEvent } from "@/hooks/course/useGradableEvent/types";

export default function useGradableEvent(): UseGradableEvent {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gradableEvents", gradableEventId],
    queryFn: () => EventSectionService.getGradableEvent(gradableEventId),
  });

  return { data, isLoading, isError };
}
