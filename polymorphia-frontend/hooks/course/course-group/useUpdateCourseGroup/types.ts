import { UseMutationResult } from "@tanstack/react-query";
import { UpdateCourseGroupRequestDTO } from "@/interfaces/api/course-groups";

export interface UseUpdateCourseGroup {
  mutation: UseMutationResult<void, Error, UpdateCourseGroupRequestDTO>;
}
