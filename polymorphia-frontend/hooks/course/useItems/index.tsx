import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/services/knowledge-base";
import { UseItems } from "@/hooks/course/useItems/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useFetch from "@/hooks/general/useFetch";

export default function useItems(): UseItems {
  const { courseId } = useUserDetails();
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["items", courseId],
    queryFn: () => KnowledgeBaseService.getItems(fetchFn, courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
