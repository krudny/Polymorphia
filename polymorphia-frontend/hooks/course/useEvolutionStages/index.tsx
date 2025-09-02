import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseEvolutionStages } from "@/hooks/course/useEvolutionStages/types";
import { useContext } from "react";
import { UserContext } from "@/providers/user/UserContext";

export default function useEvolutionStages(): UseEvolutionStages {
  const { courseId } = useContext(UserContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["evolution_stages", courseId],
    queryFn: () => KnowledgeBaseService.getEvolutionStages(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
