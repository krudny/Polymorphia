import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery } from "@tanstack/react-query";
import { MarkdownService } from "@/services/markdown";
import { UseMarkdownSource } from "@/hooks/course/useMarkdownSource/types";
import { MarkdownType } from "@/interfaces/general";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useMarkdownSource(
  type: MarkdownType
): UseMarkdownSource {
  const { gradableEventId } = useEventParams();
  const { courseId } = useUserDetails();

  const resourceId = gradableEventId || courseId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdownSource", resourceId],
    queryFn: () => MarkdownService.getSourceUrl({ type, resourceId }),
  });

  return { data, isLoading, isError };
}
