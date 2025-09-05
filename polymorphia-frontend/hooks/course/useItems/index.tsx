import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseItems } from "@/hooks/course/useItems/types";

const COURSE_ID = 1;

export default function useItems(): UseItems {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items", COURSE_ID],
    queryFn: () => KnowledgeBaseService.getItems(COURSE_ID),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
}
