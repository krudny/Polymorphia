import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/services/knowledge-base";
import { UseChests } from "@/hooks/course/useChests/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useFetch from "@/hooks/general/useFetch";

export default function useChests(): UseChests {
  const { courseId } = useUserDetails();
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["chests", courseId],
    queryFn: () => KnowledgeBaseService.getChests(fetchFn, courseId),
    refetchOnWindowFocus: false,
  });

  return { data: data, isLoading, error };
}
