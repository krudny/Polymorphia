import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/services/knowledge-base";
import { UseEvolutionStages } from "@/hooks/course/useEvolutionStages/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useEvolutionStages(): UseEvolutionStages {
  const { courseId } = useUserDetails();
  const { data, isLoading, error } = useQuery({
    queryKey: ["evolutionStages", courseId],
    queryFn: () => KnowledgeBaseService.getEvolutionStages(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
