import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import { UseRandomPeopleWithPoints } from "@/hooks/course/useRandomPeopleWithPoints/types";
import { useEventParams } from "@/hooks/general/useEventParams";
import { EventTypes } from "@/interfaces/general";

export default function useRandomPeopleWithPoints(
  debouncedSearch: string,
  sortBy: string[],
  sortOrder: string[],
  groups: string[]
): UseRandomPeopleWithPoints {
  const { eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["students", debouncedSearch, sortBy, sortOrder, groups],
    queryFn: () =>
      EventSectionService.getRandomPeopleWithPoints(
        debouncedSearch,
        sortBy,
        sortOrder,
        groups
      ),
    enabled: eventType !== EventTypes.PROJECT,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
