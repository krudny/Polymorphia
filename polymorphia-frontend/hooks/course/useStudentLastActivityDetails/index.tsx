import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import {
  UseStudentLastActivityDetails,
  useStudentLastActivityDetailsProps,
} from "@/hooks/course/useStudentLastActivityDetails/types";

export default function useStudentLastActivityDetails({
  userId,
  gradableEventId,
}: useStudentLastActivityDetailsProps): UseStudentLastActivityDetails {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentLastActivityDetails", userId, gradableEventId],
    queryFn: () =>
      CourseGroupsService.getStudentLastActivityDetails(
        userId,
        gradableEventId
      ),
  });

  return { data, isLoading, isError };
}
