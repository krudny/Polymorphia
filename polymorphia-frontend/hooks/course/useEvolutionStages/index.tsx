import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/services/knowledge-base";
import { UseEvolutionStages } from "@/hooks/course/useEvolutionStages/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useFetch from "@/hooks/general/useFetch";

export default function useEvolutionStages(): UseEvolutionStages {
  const { courseId } = useUserDetails();
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["evolutionStages", courseId],
    queryFn: () => KnowledgeBaseService.getEvolutionStages(fetchFn, courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
