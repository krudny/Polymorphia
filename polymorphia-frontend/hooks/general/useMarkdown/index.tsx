import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseMarkdown } from "@/hooks/general/useMarkdown/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useMarkdown(): UseMarkdown {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdown", gradableEventId],
    queryFn: () => EventSectionService.getMarkdown(Number(gradableEventId)),
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError };
}
