import { useQuery } from "@tanstack/react-query";
import KnowledgeBaseService from "@/app/(logged-in)/knowledge-base/KnowledgeBaseService";
import { UseChests } from "./types";
import { useContext } from "react";
import { UserContext } from "@/providers/user/UserContext";

export default function useChests(): UseChests {
  const { courseId } = useContext(UserContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["chests", courseId],
    queryFn: () => KnowledgeBaseService.getChests(courseId),
    refetchOnWindowFocus: false,
  });

  return { data: data, isLoading, error };
}
