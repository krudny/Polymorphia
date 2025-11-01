import { useQuery } from "@tanstack/react-query";
import { useEventParams } from "@/hooks/general/useEventParams";
import { MarkdownService } from "@/services/markdown";
import { MarkdownType } from "@/interfaces/general";
import { UseMarkdown } from "@/hooks/course/useMarkdown/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useFetch from "@/hooks/general/useFetch";

export function useMarkdown(markdownType: MarkdownType): UseMarkdown {
  const { gradableEventId } = useEventParams();
  const { courseId } = useUserDetails();
  const { fetch: fetchFn } = useFetch();

  const resourceId = gradableEventId || courseId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdown", resourceId],
    queryFn: () =>
      MarkdownService.getMarkdown(fetchFn, { markdownType, resourceId }),
    enabled: !!resourceId,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError };
}
