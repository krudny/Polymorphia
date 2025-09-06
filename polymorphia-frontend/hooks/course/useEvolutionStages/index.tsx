import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseEvolutionStages } from "@/hooks/course/useEvolutionStages/types";
import useUserContext from "@/hooks/contexts/useUserContext";

export default function useEvolutionStages(): UseEvolutionStages {
  const { courseId } = useUserContext().userDetails;
  const { data, isLoading, error } = useQuery({
    queryKey: ["evolution_stages", courseId],
    queryFn: () => KnowledgeBaseService.getEvolutionStages(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
