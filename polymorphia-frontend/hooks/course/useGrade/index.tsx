import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { UseGrade } from "@/hooks/course/useGrade/types";

export default function useGrade(gradableEventId: number): UseGrade {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["grade", gradableEventId],
    queryFn: () => EventSectionService.getGrade(gradableEventId),
    enabled: !!gradableEventId,
  });

  return { data, isLoading, isError };
}
