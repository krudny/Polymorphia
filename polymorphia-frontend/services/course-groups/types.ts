import {
  CourseGroupsResponseDTO,
  CourseGroupsShortResponseDTO,
} from "@/interfaces/api/course-groups";

export const CourseGroupTypes = {
  FULL: "full",
  SHORT: "short",
} as const;

export type CourseGroupType =
  (typeof CourseGroupTypes)[keyof typeof CourseGroupTypes];

export type CourseGroupResponse<T extends CourseGroupType> =
  T extends typeof CourseGroupTypes.SHORT
    ? CourseGroupsShortResponseDTO[]
    : CourseGroupsResponseDTO[];
