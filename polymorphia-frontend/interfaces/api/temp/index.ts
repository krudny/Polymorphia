import { UserDetailsDTO } from "@/interfaces/api/user";

export interface PullRequest {
  name: string;
  url: string;
}

export interface ProjectGroupResponseDTO {
  id: number;
  members: (UserDetailsDTO & { gainedXp: string | undefined })[];
}
