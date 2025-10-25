import { useQuery } from "@tanstack/react-query";
import { useEventParams } from "@/hooks/general/useEventParams";
import { MarkdownService } from "@/services/markdown";
import { MarkdownType } from "@/interfaces/general";
import { UseMarkdown } from "@/hooks/course/useMarkdown/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export function useMarkdown(markdownType: MarkdownType): UseMarkdown {
  const { gradableEventId } = useEventParams();
  const { courseId } = useUserDetails();

  const resourceId = gradableEventId || courseId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdown", resourceId],
    queryFn: () => MarkdownService.getMarkdown({ markdownType, resourceId }),
    enabled: !!resourceId,
    staleTime: 1000 * 60,
  });

  return { data, isLoading, isError };
}
