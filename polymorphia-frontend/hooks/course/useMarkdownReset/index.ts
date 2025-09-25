import {useEventParams} from "@/hooks/general/useEventParams";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MarkdownService} from "@/app/(logged-in)/course/[eventType]/[eventSectionId]/[gradableEventId]/MarkdownService";
import toast from "react-hot-toast";
import {UseMarkdownReset} from "@/hooks/course/useMarkdownReset/types";

export default function useMarkdownReset(): UseMarkdownReset {
  const { gradableEventId } = useEventParams();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => MarkdownService.resetMarkdown(Number(gradableEventId)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['markdown', gradableEventId],
      });
      toast.success("Pomyślnie zresetowano plik!");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}