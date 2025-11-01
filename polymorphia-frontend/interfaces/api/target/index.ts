import { StudentDetailsDTOWithName } from "@/interfaces/api/user";

export interface StudentTargetData extends StudentDetailsDTOWithName {
  gainedXp?: string;
}

export const TargetTypes = {
  STUDENT: "STUDENT",
  STUDENT_GROUP: "STUDENT_GROUP",
} as const;

export type TargetType = (typeof TargetTypes)[keyof typeof TargetTypes];

export const GroupTargetTypes = {
  MATCHING: "MATCHING",
  DIVERGENT: "DIVERGENT",
} as const;

export type GroupTargetType =
  (typeof GroupTargetTypes)[keyof typeof GroupTargetTypes];

export interface StudentTargetResponseDTO extends StudentTargetData {
  type: typeof TargetTypes.STUDENT;
}

export interface StudentGroupTargetResponseDTO {
  type: typeof TargetTypes.STUDENT_GROUP;
  groupType: GroupTargetType;
  groupId: number;
  members: StudentTargetData[];
}

export type TargetResponseDTO =
  | StudentTargetResponseDTO
  | StudentGroupTargetResponseDTO;

export type TargetRequestDTO =
  | { type: typeof TargetTypes.STUDENT; id: number }
  | { type: typeof TargetTypes.STUDENT_GROUP; groupId: number };
