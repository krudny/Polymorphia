import {useQuery} from "@tanstack/react-query";
import {useEventParams} from "@/hooks/general/useEventParams";
import {MarkdownService} from "@/app/(logged-in)/course/[eventType]/[eventSectionId]/[gradableEventId]/MarkdownService";
import {MarkdownType} from "@/interfaces/general";
import {UseMarkdown} from "@/hooks/course/useMarkdown/types";

const COURSE_ID = 1;

export function useMarkdown(type: MarkdownType): UseMarkdown {
  const { gradableEventId } = useEventParams();

  const resourceId = gradableEventId || COURSE_ID;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdown", resourceId],
    queryFn: () => MarkdownService.getMarkdown({type, resourceId}),
    enabled: !!resourceId,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError };
}
