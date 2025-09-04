import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseRandomPeopleWithPoints } from "@/hooks/course/useRandomPeopleWithPoints/types";
import { useEventParams } from "@/hooks/general/useEventParams";

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
        groups,
        eventType
      ),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
