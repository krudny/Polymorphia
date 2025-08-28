import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseGrade2 } from "@/hooks/course/useGrade2/types";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function useGrade2(selectedStudentId: number | null): UseGrade2 {
  const { gradableEventId } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["grade", selectedStudentId, gradableEventId],
    queryFn: () => EventSectionService.getGrade2(selectedStudentId ?? -1, gradableEventId),
  });

  return { data, isLoading, isError };
}
