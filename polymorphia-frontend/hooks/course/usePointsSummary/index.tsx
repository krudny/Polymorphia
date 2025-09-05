import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UsePointsSummary } from "@/hooks/course/usePointsSummary/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function usePointsSummary(): UsePointsSummary {
  const { eventSectionId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pointsSummary", eventSectionId],
    queryFn: () => EventSectionService.getPointsSummary(eventSectionId),
  });

  return { data, isLoading, isError };
}
