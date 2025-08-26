import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseItems } from "@/hooks/useItems/types";

const COURSE_ID = 1;

export default function useItems(): UseItems {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items", 1],
    queryFn: () => KnowledgeBaseService.getItems(COURSE_ID),
    retry: false,
  });

  return { data, isLoading, error };
}