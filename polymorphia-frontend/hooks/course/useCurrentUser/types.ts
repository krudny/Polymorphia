import { UserDetailsDTO } from "@/interfaces/api/user";

export interface UseCurrentUser {
  data: UserDetailsDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
