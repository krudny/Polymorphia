import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import {
  UseStudentGradableEventDetails,
  useStudentGradableEventDetailsProps,
} from "@/hooks/course/useStudentGradableEventDetails/types";

export default function useStudentGradableEventDetails({
  userId,
  gradableEventId,
}: useStudentGradableEventDetailsProps): UseStudentGradableEventDetails {
  console.log("called");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentGradableEventId", userId, gradableEventId],
    queryFn: () =>
      CourseGroupsService.getStudentGradableEventDetails(
        userId,
        gradableEventId
      ),
  });

  return { data, isLoading, isError };
}
