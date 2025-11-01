import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MarkdownService } from "@/services/markdown";
import toast from "react-hot-toast";
import {
  UseMarkdownReset,
  UseMarkdownResetProps,
} from "@/hooks/course/useMarkdownReset/types";
import useFetch from "@/hooks/general/useFetch";

export default function useMarkdownReset(
  request: UseMarkdownResetProps
): UseMarkdownReset {
  const queryClient = useQueryClient();
  const { fetch: fetchFn } = useFetch();

  return useMutation({
    mutationFn: () => {
      return toast.promise(MarkdownService.resetMarkdown(fetchFn, request), {
        loading: "Resetowanie...",
        success: "Pomyślnie zresetowano plik!",
        error: "Wystąpił błąd przy resetowaniu!",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markdown", request.resourceId],
      });
    },
  });
}
