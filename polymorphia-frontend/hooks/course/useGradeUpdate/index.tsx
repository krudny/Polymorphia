import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseGradeUpdate } from "@/hooks/course/useGradeUpdate/types";
import { GradeService } from "@/services/grade";

export default function useGradeUpdate(): UseGradeUpdate {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return toast.promise(GradeService.submitGrade(data), {
        loading: "Zapisywanie oceny...",
        success: "Ocena została pomyślnie zapisana!",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grade"],
      });
      queryClient.invalidateQueries({
        queryKey: ["gradingTargets"],
      });
    },
  });
}
