import {useQuery} from "@tanstack/react-query";
import {UseMarkdown} from "@/hooks/general/useMarkdown/types";
import {useEventParams} from "@/hooks/general/useEventParams";
import {MarkdownService} from "@/app/(logged-in)/course/[eventType]/[eventSectionId]/[gradableEventId]/MarkdownService";

export default function useMarkdown(): UseMarkdown {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdown", gradableEventId],
    queryFn: () => MarkdownService.getMarkdown(Number(gradableEventId)),
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError };
}
