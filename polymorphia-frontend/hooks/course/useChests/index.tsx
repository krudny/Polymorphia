import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseChests } from "./types";
import useUserContext from "@/hooks/contexts/useUserContext";

export default function useChests(): UseChests {
  const { courseId } = useUserContext().userDetails;
  const { data, isLoading, error } = useQuery({
    queryKey: ["chests", courseId],
    queryFn: () => KnowledgeBaseService.getChests(courseId),
    refetchOnWindowFocus: false,
  });

  return { data: data, isLoading, error };
}
