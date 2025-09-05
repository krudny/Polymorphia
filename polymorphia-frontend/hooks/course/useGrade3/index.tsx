import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseGrade3 } from "@/hooks/course/useGrade3/types";

export default function useGrade3(selectedStudentId: number | null): UseGrade3 {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["grade3", selectedStudentId, gradableEventId],
    queryFn: () =>
      EventSectionService.getGrade3(selectedStudentId ?? -1, gradableEventId),
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
}
