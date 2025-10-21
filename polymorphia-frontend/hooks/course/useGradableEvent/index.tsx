import { useEventParams } from "@/hooks/general/useEventParams";
import { EventSectionService } from "@/services/event-section";
import { useQuery } from "@tanstack/react-query";

export default function useGradableEvent() {
  const { eventSectionId, gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gradableEvents", eventSectionId, gradableEventId],
    queryFn: () =>
      EventSectionService.getGradableEvent(eventSectionId, gradableEventId),
  });

  return { data, isLoading, isError };
}
