import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery } from "@tanstack/react-query";
import { MarkdownService } from "@/app/(logged-in)/course/[eventType]/[eventSectionId]/[gradableEventId]/MarkdownService";
import { UseMarkdownSource } from "@/hooks/course/useMarkdownSource/types";

export default function useMarkdownSource(): UseMarkdownSource {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdown_source", gradableEventId],
    queryFn: () => MarkdownService.getSourceUrl(Number(gradableEventId)),
  });

  return { data, isLoading, isError };
}
