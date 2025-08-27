import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseEvolutionStages } from "@/hooks/course/useEvolutionStages/types";

const COURSE_ID = 1;

export default function useEvolutionStages(): UseEvolutionStages {
  const { data, isLoading, error } = useQuery({
    queryKey: ["evolution_stages", COURSE_ID],
    queryFn: () => KnowledgeBaseService.getEvolutionStages(COURSE_ID),
  });

  return { data, isLoading, error };
}