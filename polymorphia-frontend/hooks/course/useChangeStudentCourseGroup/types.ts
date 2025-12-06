import { UseMutationResult } from "@tanstack/react-query";
import { ChangeStudentCourseGroupRequestDTO } from "@/interfaces/api/course-groups";

export interface UseChangeStudentCourseGroup {
  mutation: UseMutationResult<void, Error, ChangeStudentCourseGroupRequestDTO>;
}
