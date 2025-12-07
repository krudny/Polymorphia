import { UseMutationResult } from "@tanstack/react-query";
import { CreateCourseGroupRequestDTO } from "@/interfaces/api/course-groups";

export interface UseCreateCourseGroup {
  mutation: UseMutationResult<void, Error, CreateCourseGroupRequestDTO>;
}
