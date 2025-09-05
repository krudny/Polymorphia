import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseProjectGroups } from "@/hooks/course/useProjectGroups/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useProjectGroups(
  debouncedSearch: string
): UseProjectGroups {
  const { eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectGroups", debouncedSearch],
    queryFn: () => EventSectionService.getRandomProjectGroups(),
    enabled: eventType === "PROJECT",
  });

  return { data, isLoading, isError };
}
