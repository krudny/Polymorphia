import { UserDetailsDTO } from "@/interfaces/api/user";

export interface PullRequest {
  id: number;
  name: string;
  url: string;
}

export interface ProjectGroupResponseDTO {
  id: number;
  members: (UserDetailsDTO & { gainedXp: string | undefined })[];
}

export const Roles = {
  STUDENT: "student",
  INSTRUCTOR: "instructor",
  COORDINATOR: "coordinator",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
