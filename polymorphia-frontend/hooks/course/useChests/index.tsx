import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseChests } from "./types";

const COURSE_ID = 1;

export default function useChests(): UseChests {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chests", COURSE_ID],
    queryFn: () => KnowledgeBaseService.getChests(COURSE_ID),
    refetchOnWindowFocus: false,
  });

  return { data: data, isLoading, error };
}
