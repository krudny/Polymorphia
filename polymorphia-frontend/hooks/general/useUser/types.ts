import { UserDetailsDTO } from "@/interfaces/api/user";

export interface UseUser {
  data: UserDetailsDTO | undefined;
  isLoading: boolean;
}