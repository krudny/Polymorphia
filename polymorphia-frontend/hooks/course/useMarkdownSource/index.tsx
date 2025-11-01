import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery } from "@tanstack/react-query";
import { MarkdownService } from "@/services/markdown";
import { UseMarkdownSource } from "@/hooks/course/useMarkdownSource/types";
import { MarkdownType } from "@/interfaces/general";
import useUserContext, {
  useUserDetails,
} from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";
import useFetch from "@/hooks/general/useFetch";

export default function useMarkdownSource(
  markdownType: MarkdownType
): UseMarkdownSource {
  const { gradableEventId } = useEventParams();
  const { courseId } = useUserDetails();
  const { userRole } = useUserContext();
  const { fetch: fetchFn } = useFetch();

  const resourceId = gradableEventId || courseId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["markdownSource", resourceId],
    queryFn: () =>
      MarkdownService.getSourceUrl(fetchFn, { markdownType, resourceId }),
    enabled: userRole !== Roles.STUDENT,
  });

  return { data, isLoading, isError };
}
