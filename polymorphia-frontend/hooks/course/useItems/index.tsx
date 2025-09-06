import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseItems } from "@/hooks/course/useItems/types";
import useUserContext from "@/hooks/contexts/useUserContext";

export default function useItems(): UseItems {
  const { courseId } = useUserContext().userDetails;
  const { data, isLoading, error } = useQuery({
    queryKey: ["items", courseId],
    queryFn: () => KnowledgeBaseService.getItems(courseId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
