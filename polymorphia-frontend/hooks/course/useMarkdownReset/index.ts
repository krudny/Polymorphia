import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MarkdownService } from "@/services/markdown";
import toast from "react-hot-toast";
import {
  UseMarkdownReset,
  UseMarkdownResetProps,
} from "@/hooks/course/useMarkdownReset/types";

export default function useMarkdownReset(
  request: UseMarkdownResetProps
): UseMarkdownReset {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return toast.promise(MarkdownService.resetMarkdown(request), {
        loading: "Resetowanie...",
        success: "Pomyślnie zresetowano plik!",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markdown", request.markdownType, request.resourceId],
      });
    },
  });
}
