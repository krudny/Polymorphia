import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseCriteria } from "@/hooks/course/useCriteria/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useCriteria(): UseCriteria {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["criteria", gradableEventId],
    queryFn: () => EventSectionService.getCriteria(gradableEventId),
  });

  return { data, isLoading, isError };
}
