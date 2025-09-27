import { StudentDetailsDTOWithType } from "@/interfaces/api/user";

export interface PullRequest {
  id: number;
  name: string;
  url: string;
}

export interface ProjectGroupResponseDTO {
  id: number;
  members: (StudentDetailsDTOWithType & { gainedXp: string | undefined })[];
}
