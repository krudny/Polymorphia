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
