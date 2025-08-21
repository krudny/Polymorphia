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
  STUDENT: "STUDENT",
  INSTRUCTOR: "INSTRUCTOR",
  COORDINATOR: "COORDINATOR",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
