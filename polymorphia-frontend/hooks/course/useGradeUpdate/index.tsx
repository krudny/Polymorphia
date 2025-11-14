import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseGradeUpdate } from "@/hooks/course/useGradeUpdate/types";
import { GradeService } from "@/services/grade";

export default function useGradeUpdate(): UseGradeUpdate {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: GradeService.submitGrade,
    onSuccess: () => {
      toast.success("Ocena została pomyślnie zapisana!");
      queryClient.invalidateQueries({
        queryKey: ["grade"],
      });
    },
    onError: () => {
      toast.error("Wystąpił błąd podczas zapisywania oceny");
    },
  });
}
