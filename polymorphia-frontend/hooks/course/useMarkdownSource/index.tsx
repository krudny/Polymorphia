import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery } from "@tanstack/react-query";
import { MarkdownService } from "@/app/(logged-in)/course/[eventType]/[eventSectionId]/[gradableEventId]/MarkdownService";
import { UseMarkdownSource } from "@/hooks/course/useMarkdownSource/types";
import { MarkdownType } from "@/interfaces/general";

const COURSE_ID = 1;

export default function useMarkdownSource(
  type: MarkdownType
): UseMarkdownSource {
  const { gradableEventId } = useEventParams();

  const resourceId = gradableEventId || COURSE_ID;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdownSource", resourceId],
    queryFn: () => MarkdownService.getSourceUrl({ type, resourceId }),
  });

  return { data, isLoading, isError };
}
